import { NextResponse } from "next/server";

type GoogleReview = {
  rating: number;
  text: string;
  author_name: string;
  profile_photo_url?: string;
  time?: number;
};

type GooglePlaceDetailsResponse = {
  status: string;
  result?: {
    reviews?: GoogleReview[];
  };
};

export async function GET(request: Request) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ error: "Missing Google Places env vars." }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const language = searchParams.get("lang") || "lv";
  const limit = Math.min(Number(searchParams.get("limit") || 6), 20);

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "reviews");
  url.searchParams.set("language", language);
  url.searchParams.set("key", apiKey);

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });
  const data = (await response.json()) as GooglePlaceDetailsResponse;

  if (data.status !== "OK") {
    return NextResponse.json(
      { error: "Google Places API error", status: data.status },
      { status: 502 }
    );
  }

  const reviews = (data.result?.reviews || []).slice(0, limit).map((review) => ({
    review: review.rating,
    text: review.text,
    author: review.author_name,
    avatar: review.profile_photo_url || "",
  }));

  return NextResponse.json({ reviews });
}
