import connectDB from "@/config/database";
import Customer from "@/models/Customer";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    firstName,
    middleName,
    lastName,
    countryofbirth,
    nationality,
    email,
    occupation,
    country,
    state,
    address,
    zip,
    mobile,
  } = await request.json();

  await connectDB();
  await Customer.findByIdAndUpdate(id, {
    firstName,
    middleName,
    lastName,
    countryofbirth,
    nationality,
    email,
    occupation,
    country,
    state,
    address,
    zip,
    mobile,
  });
  return NextResponse.json({ message: "customer created" }, { status: 200 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectDB();
  const customer = await Customer.findOne({ _id: id });
  return NextResponse.json({ customer }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectDB();
  await Customer.findByIdAndDelete(id);
  return NextResponse.json({ message: "Rate Deleted" }, { status: 200 });
}
