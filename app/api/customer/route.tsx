import Customer from "@/models/Customer";
import connectMongoDB from "@/config/database";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    ctype,
    firstName,
    middleName,
    lastName,
    dob,
    countryOfBirth,
    nationality,
    email,
    occupation,
    country,
    state,
    city,
    address,
    zip,
    mobile,
    comment,
  } = await request.json();
  await connectMongoDB();
  await Customer.create({
    ctype,
    firstName,
    middleName,
    lastName,
    dob,
    countryOfBirth,
    nationality,
    email,
    occupation,
    country,
    state,
    city,
    address,
    zip,
    mobile,
    comment,
  });
  return NextResponse.json({ message: "Customer Created" }, { status: 201 });
}

export async function GET(request: Request) {
  const { MongoClient, ObjectId } = require("mongodb");

  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    await connectMongoDB();
    const objectId = new ObjectId(id);

    const customer = await Customer.findOne({ _id: objectId });
    return NextResponse.json({ customer });
  } else {
    await connectMongoDB();
    const customer = await Customer.find();
    return NextResponse.json({ customer });
  }
}
