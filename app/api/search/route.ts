import { NextRequest, NextResponse } from "next/server";
import { getOpenAI } from "@/app/lib/openai";

const MAX_QUERY_LENGTH = 500;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const query = body?.query;

    if (!query || typeof query !== "string" || query.trim().length === 0 || query.length > MAX_QUERY_LENGTH) {
      return NextResponse.json({
        status: 400,
        message: `A valid search query (up to ${MAX_QUERY_LENGTH} characters) is required.`,
      });
    }

    // System prompt خاص بمشروع وين الضهرة لطلب أماكن بصيغة JSON نقي
    const systemPrompt = `You are an AI assistant for "Wen El Dahra", a local place discovery app. 
The user will search for a mood, preference, or place type. 
You MUST reply ONLY with a valid JSON array of objects. No markdown formatting like \`\`\`json, just the raw JSON array.
Each object must have these exact keys:
- "id": string (unique identifier, e.g. "1")
- "name": string (place name)
- "description": string (short catchy description)
- "category": string (e.g. Café, Restaurant, Park)
- "rating": string (e.g. "4.8")`;

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query },
      ],
    });

    const rawContent = completion.choices[0]?.message?.content || "[]";
    // تنظيف الـ JSON وتأكيد خلوه من أي كلام إضافي
    const cleanedContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
    const places = JSON.parse(cleanedContent);

    return NextResponse.json({ status: 200, data: { places } });
  } catch (error) {
    console.error("Failed to fetch places from OpenAI:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to get recommendations from the assistant",
    }, { status: 500 });
  }
}