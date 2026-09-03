// this page for places api route get and post

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { IPlace } from "@/app/interfaces/interfaces";

export async function GET() {
  try {
    const places = await prisma.place.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ status: 200, data: places });
  } catch (error) {
    console.error("Failed to fetch places:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch places",
    });
  }
}

export async function POST(request: NextRequest) {
  try {
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

    if (!name || !category) {
      return NextResponse.json({
        status: 400,
        message: "name and category are required",
      });
    }

    const place = await prisma.place.create({
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
        tags: tags ?? [],
        address,
      },
    });

    return NextResponse.json({ status: 201, data: place });
  } catch (error) {
    console.error("Failed to create place:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to create place",
    });
  }
}