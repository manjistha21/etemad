import connectDB from "@/config/database";
import { NextApiResponse, NextApiRequest } from "next";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
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
    rate,
    totalamount,
  } = await request.json();
  await connectDB();
  await Order.findByIdAndUpdate(id, {
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
    rate,
    totalamount,
  });
  return NextResponse.json({ message: "order created" }, { status: 200 });
}

export async function GET(
  request: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectDB();
  const order = await Order.findOne({ _id: id });
  return NextResponse.json({ order }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectDB();
  await Order.findByIdAndDelete(id);
  return NextResponse.json({ message: "Order Deleted" }, { status: 200 });
}
