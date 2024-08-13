import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20"
});

export const GET = async(request: NextRequest) => {
  try {
    const {searchParams} = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({msg: "token is required"}, {status: 400});
    }

    const customer = await stripe.customers.retrieve(token);
    
    if((customer as Stripe.Customer).deleted) {
      return NextResponse.json({msg: "customer not found"}, {status: 404});
    }

    const customerData = customer as Stripe.Customer;
    return NextResponse.json({
      name: customerData.name,
      email: customerData.email,
    }, {status: 200});


  } catch (error: any) {
    console.error("error :", error);
    return NextResponse.json({msg: "error"}, {status: 500});
  }
}
