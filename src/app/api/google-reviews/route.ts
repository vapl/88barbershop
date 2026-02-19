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
    rating?: number;
    user_ratings_total?: number;
    reviews?: GoogleReview[];
  };
  error_message?: string;
};

export async function GET(request: Request) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeIdPrimary = process.env.GOOGLE_PLACE_ID;
  const placeIdSecondary = process.env.GOOGLE_PLACE_ID_2;

  if (!apiKey || !placeIdPrimary) {
    return NextResponse.json({ error: "Missing Google Places env vars." }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const language = searchParams.get("lang");
  const perPlaceLimit = Math.min(Number(searchParams.get("perPlaceLimit") || 5), 5);
  const totalLimit = Math.min(
    Number(searchParams.get("limit") || perPlaceLimit * (placeIdSecondary ? 2 : 1)),
    10
  );

  const placeIds = [placeIdPrimary, placeIdSecondary].filter(
    (id): id is string => Boolean(id && id.trim())
  );

  const placeResponses = await Promise.all(
    placeIds.map(async (placeId) => {
      const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
      url.searchParams.set("place_id", placeId);
      url.searchParams.set("fields", "reviews,rating,user_ratings_total");
      if (language) {
        url.searchParams.set("language", language);
      }
      url.searchParams.set("key", apiKey);

      const response = await fetch(url.toString(), {
        next: { revalidate: 3600 },
      });

      const data = (await response.json()) as GooglePlaceDetailsResponse;
      return { placeId, response, data };
    })
  );

  const failed = placeResponses.find(({ data }) => data.status !== "OK");
  if (failed) {
    return NextResponse.json(
      {
        error: "Google Places API error",
        status: failed.data.status,
        details: failed.data.error_message || null,
        placeId: failed.placeId,
      },
      { status: 502 }
    );
  }

  const perPlaceReviews = placeResponses.flatMap(({ data }) =>
    (data.result?.reviews || []).sort((a, b) => (b.time || 0) - (a.time || 0)).slice(0, perPlaceLimit)
  );

  const dedupedReviews = perPlaceReviews.filter((review, index, arr) => {
    const key = `${review.author_name}__${review.text}__${review.time || 0}`;
    return arr.findIndex((r) => `${r.author_name}__${r.text}__${r.time || 0}` === key) === index;
  });

  const reviews = dedupedReviews
    .sort((a, b) => (b.time || 0) - (a.time || 0))
    .slice(0, totalLimit)
    .map((review) => ({
      review: review.rating,
      text: review.text,
      author: review.author_name,
      avatar: review.profile_photo_url || "",
      time: review.time || 0,
    }));

  const ratings = placeResponses
    .map(({ data }) => ({
      rating: data.result?.rating ?? null,
      total: data.result?.user_ratings_total ?? 0,
    }))
    .filter((item) => item.rating !== null && item.total > 0);

  const totalReviews = ratings.reduce((sum, item) => sum + item.total, 0);
  const weightedRating =
    totalReviews > 0
      ? ratings.reduce((sum, item) => sum + (item.rating as number) * item.total, 0) / totalReviews
      : null;

  return NextResponse.json({
    reviews,
    summary: {
      rating: weightedRating,
      totalReviews: totalReviews || null,
    },
    sources: placeIds.length,
  });
}
