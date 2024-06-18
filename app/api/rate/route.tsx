import RateModel from "@/models/rate";
import connectDB from "@/config/database";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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
  await RateModel.create({
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
  return NextResponse.json({ message: "Rate Created" }, { status: 201 });
}




export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');

    if (country) {
      const rates = await RateModel.find({ tocountry: country });
      if (rates.length === 0) {
        return NextResponse.json({ error: "No rate found for the specified country" }, { status: 404 });
      }
      return NextResponse.json({ rates });
    } else {
      const rates = await RateModel.find();
      return NextResponse.json({ rates });
    }
  } catch (error) {
    console.error("Error fetching rate data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE(request: any) {
  const { id } = request.query;
  await connectDB();
  await RateModel.findByIdAndDelete(id);
  return NextResponse.json({ message: "Rate Deleted" }, { status: 200 });
}
