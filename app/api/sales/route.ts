import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { ISale } from "@/app/interfaces/interfaces";

export async function GET() {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ status: 200, data: sales });
  } catch (error) {
    console.error("Failed to fetch sales:", error);
    return NextResponse.json({ status: 500, message: "Failed to fetch sales" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, image, date, isSale, discount, location } = body as ISale;

    if (!title || !category) {
      return NextResponse.json({ status: 400, message: "title and category are required" });
    }

    const sale = await prisma.sale.create({
      data: { title, description, category, image, date, isSale, discount, location },
    });

    return NextResponse.json({ status: 201, data: sale });
  } catch (error) {
    console.error("Failed to create sale:", error);
    return NextResponse.json({ status: 500, message: "Failed to create sale" });
  }
}