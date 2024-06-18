import connectDB from "@/config/database";
import { NextApiResponse, NextApiRequest } from "next";
import Rate from "@/models/rate";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    basecountry,
    foreigncurrency,
    fromcountry,
    tocountry,
    ratecurrency,
    transfertype,
    status,
    unit,
    rate,
  } = await request.json();
  await connectDB();
  await Rate.findByIdAndUpdate(id, {
    basecountry,
    foreigncurrency,
    fromcountry,
    tocountry,
    ratecurrency,
    transfertype,
    status,
    unit,
    rate,
  });
  return NextResponse.json({ message: "rate created" }, { status: 200 });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectDB();
  const rate = await Rate.findOne({ _id: id });
  return NextResponse.json({ rate }, { status: 200 });
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectDB();
  await Rate.findByIdAndDelete(id);
  return NextResponse.json({ message: "Rate Deleted" }, { status: 200 });
}
