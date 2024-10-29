import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  return request;
  const { shop, payload, topic } = await authenticate.webhook(request);

  // Implement handling of mandatory compliance topics
  // See: https://shopify.dev/docs/apps/build/privacy-law-compliance
  localStorage.setItem(`TestWebhook`, JSON.stringify({ TestWebhook: topic }));

  console.log(`Received ${topic} webhook for ${shop}`);
  console.log(JSON.stringify(payload, null, 2));

  return new Response();
};
