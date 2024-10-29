import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  try {
    const { shop, payload, topic } = await authenticate.webhook(request);

    // Extract data from payload
    const orderData = payload;
    const createdAt = new Date(orderData.created_at);

    // Find the user (shop) in your database
    const user = await prisma.session.findFirst({
      where: { shop: '610-weblab.myshopify.com' },
    });

    if (!user) {
      console.log(`User with shop name ${shop} not found.`);
      return new Response("User not found", { status: 404 });
    }

    const patient = await prisma?.patient?.findFirst({
      where: {
        OR: [
          { email: orderData.customer.email },
          { phone: orderData.customer.phone || null }, // Handle null phone case
        ],
      },
    });

    const orderDetails = await prisma.order.create({
      data: {
        order_id: orderData.id,
        order_name: orderData.name,
        order_date: createdAt,
        customer_id: orderData.customer.id,
        customer_name: `${orderData.customer.first_name} ${orderData.customer.last_name}`,
        customer_email: orderData.customer.email,
        total: orderData.total_price,
        payment_status: orderData.financial_status,
        fullfilement: orderData.fulfillment_status || "",
        item_count: orderData.line_items.length.toString(),
        delivery_status: "",
        delivery_method: "",
        patientId: patient?patient.id:null
      },
    });
    console.log(`orderDetails ${orderDetails} webhook for ${orderData.line_items}`);


    await Promise.all(
      orderData.line_items.map(async (item) => {
        await prisma.orderItem.create({
          data: {
            orderId: orderDetails.id, // Link order item to the created order
            productName: item.name,
            quantity: item.quantity,
            price: parseFloat(item.price), // Ensure price is a float
          },
        });
      })
    );

    console.log(`Received ${topic} webhook for ${shop}`);
    console.log(JSON.stringify(orderDetails, null, 2));

    return new Response("Order processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing order webhook:", error);
    return new Response("Error processing order webhook", { status: 500 });
  }
};
