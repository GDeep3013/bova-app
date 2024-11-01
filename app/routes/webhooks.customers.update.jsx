import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { shop, payload, topic } = await authenticate.webhook(request);

  // Store the webhook data in localStorage
  if (typeof window !== "undefined") {
    window.localStorage.setItem(`TestWebhook`, JSON.stringify({ shop, topic, payload }));
  }

  // Implement handling of mandatory compliance topics
  // See: https://shopify.dev/docs/apps/build/privacy-law-compliance
  console.log(`Received ${topic} webhook for ${shop}`);
  console.log(JSON.stringify(payload, null, 2));

  return new Response();
};
