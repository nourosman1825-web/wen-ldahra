
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { IPlace } from "@/app/interfaces/interfaces";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const placeId = Number(id);

    if (Number.isNaN(placeId)) {
      return NextResponse.json({ status: 400, message: "invalid place id" });
    }

    const place = await prisma.place.findUnique({
      where: { id: placeId },
    });

    if (!place) {
      return NextResponse.json({ status: 404, message: "place not found" });
    }

    return NextResponse.json({ status: 200, data: place });
  } catch (error) {
    console.error("Failed to fetch place:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch place",
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const placeId = Number(id);

    if (Number.isNaN(placeId)) {
      return NextResponse.json({ status: 400, message: "invalid place id" });
    }

    const body = await request.json();
    const {
      name,
      description,
      image,
      rating,
      reviewCount,
      distance,
      latitude,
      longitude,
      category,
      tags,
      address,
    } = body as IPlace;

    const place = await prisma.place.update({
      where: { id: placeId },
      data: {
        name,
        description,
        image,
        rating,
        reviewCount,
        distance,
        latitude,
        longitude,
        category,
        tags,
        address,
      },
    });

    return NextResponse.json({ status: 200, data: place });
  } catch (error) {
    console.error("Failed to update place:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to update place",
    });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const placeId = Number(id);

    if (Number.isNaN(placeId)) {
      return NextResponse.json({ status: 400, message: "invalid place id" });
    }

    const place = await prisma.place.delete({
      where: { id: placeId },
    });

    return NextResponse.json({ status: 200, data: place });
  } catch (error) {
    console.error("Failed to delete place:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to delete place",
    });
  }
}