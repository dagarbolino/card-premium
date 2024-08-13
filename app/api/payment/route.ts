import { NextRequest, NextResponse } from "next/server";
import stripe from "stripe";

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY as string);

interface Data {
  name: string;
  price: number;
  image: string;
}


export const POST = async (request: NextRequest) => {
  try{
    const data:Data = await request.json();
    console.log(data)

    const customer = await stripeClient.customers.create({
      email: "test@gmail.com",
      address: {
        city: "Paris",
        country: "France",
        line1: "1 rue de la paix",
        postal_code: "75000",
      },
      name: "alexandre dnk",
    });
    console.log(customer)

    const amountInCents = Math.round(data.price * 100);

    const checkOutSession = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id,
      mode: "payment",

      success_url: "http://localhost:3000/success?token="+customer.id,
      cancel_url: "http://localhost:3000/cancel?token="+customer.id,

      line_items: [
        {
          quantity: 1,
          price_data: {
            product_data: {
              name: data.name,
              images: [data.image],
            },
            currency: "eur",
            unit_amount: amountInCents,
          },
        },
      ],

    });
    console.log(checkOutSession.url)
    return NextResponse.json({msg:checkOutSession, url: checkOutSession.url}, 
      {status: 200});

  }catch(error: any){
    console.error("error :", error);
    return NextResponse.json({error: error.message}, {status: 500});
  }
}