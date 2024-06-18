import OrderModel from "@/models/order";
import connectDB from "@/config/database";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    AMLstatus,
    orderdate,
    tags,
    customer,
    status,
    reasonfortransfer,
    foreigncurrency,
    country,
    sourceoffunds,
    quantity,
    commission,
    rate
   
    
  } = await request.json();
  await connectDB();
  await OrderModel.create({
    AMLstatus,
    orderdate,
    tags,
    customer,
    status,
    reasonfortransfer,
    foreigncurrency,
    country,
    sourceoffunds,
    quantity,
    commission,
    rate
    
  });
  return NextResponse.json({ message: "order Created" }, { status: 201 });
}

export async function GET() {
  await connectDB();
  const orders = await OrderModel.find();
  return NextResponse.json({ orders });
}
