import DocumentModel from "@/models/document";
import connectDB from "@/config/database";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    documentname,
    customername,
    customerid,
    documenttype,
    documentstatus,
    validationsource,
    number,
    issue,
    state,
    cardnumber,
    description,
  } = await request.json();
  await connectDB();
  await DocumentModel.create({
    documentname,
    customername,
    customerid,
    documenttype,
    documentstatus,
    validationsource,
    number,
    issue,
    state,
    cardnumber,
    description,
  });
  return NextResponse.json({ message: "document Created" }, { status: 201 });
}

export async function GET() {
  await connectDB();
  const documents = await DocumentModel.find();
  return NextResponse.json({ documents });
}
