import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { ISale } from "@/app/interfaces/interfaces";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const saleId = Number(id);
    if (Number.isNaN(saleId)) {
      return NextResponse.json({ status: 400, message: "invalid sale id" });
    }

    const sale = await prisma.sale.findUnique({ where: { id: saleId } });
    if (!sale) {
      return NextResponse.json({ status: 404, message: "sale not found" });
    }

    return NextResponse.json({ status: 200, data: sale });
  } catch (error) {
    console.error("Failed to fetch sale:", error);
    return NextResponse.json({ status: 500, message: "Failed to fetch sale" });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const saleId = Number(id);
    if (Number.isNaN(saleId)) {
      return NextResponse.json({ status: 400, message: "invalid sale id" });
    }

    const body = await request.json();
    const { title, description, category, image, date, isSale, discount, location } = body as ISale;

    const sale = await prisma.sale.update({
      where: { id: saleId },
      data: { title, description, category, image, date, isSale, discount, location },
    });

    return NextResponse.json({ status: 200, data: sale });
  } catch (error) {
    console.error("Failed to update sale:", error);
    return NextResponse.json({ status: 500, message: "Failed to update sale" });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const saleId = Number(id);
    if (Number.isNaN(saleId)) {
      return NextResponse.json({ status: 400, message: "invalid sale id" });
    }

    const sale = await prisma.sale.delete({ where: { id: saleId } });
    return NextResponse.json({ status: 200, data: sale });
  } catch (error) {
    console.error("Failed to delete sale:", error);
    return NextResponse.json({ status: 500, message: "Failed to delete sale" });
  }
}