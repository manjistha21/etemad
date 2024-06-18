import connectDB from "@/config/database";
import Document from "@/models/document";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    customerid,
    customername,
    documentname,
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
  await Document.findByIdAndUpdate(id, {
    customerid,
    customername,
    documentname,
    documenttype,
    documentstatus,
    validationsource,
    number,
    issue,
    state,
    cardnumber,
    description,
  });
  return NextResponse.json({ message: "document created" }, { status: 200 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectDB();
  const document = await Document.findOne({ _id: id });
  return NextResponse.json({ document }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectDB();
  await Document.findByIdAndDelete(id);
  return NextResponse.json({ message: "Rate Deleted" }, { status: 200 });
}
