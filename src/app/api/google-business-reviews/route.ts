import { NextResponse } from "next/server";

type BusinessReview = {
  starRating?: string;
  comment?: string;
  updateTime?: string;
  reviewer?: {
    displayName?: string;
    profilePhotoUrl?: string;
  };
};

type ReviewsResponse = {
  reviews?: BusinessReview[];
  nextPageToken?: string;
};

const toNumberRating = (rating?: string) => {
  switch (rating) {
    case "ONE":
      return 1;
    case "TWO":
      return 2;
    case "THREE":
      return 3;
    case "FOUR":
      return 4;
    case "FIVE":
      return 5;
    default:
      return 0;
  }
};

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  const accountId = process.env.GOOGLE_BUSINESS_ACCOUNT_ID;
  const locationId = process.env.GOOGLE_BUSINESS_LOCATION_ID;

  if (!clientId || !clientSecret || !refreshToken || !accountId || !locationId) {
    return NextResponse.json({ error: "Missing Business Profile env vars." }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit") || 10), 50);

  const tokenBody = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: tokenBody.toString(),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    return NextResponse.json({ error: "Token refresh failed", details: tokenData }, { status: 500 });
  }

  const accessToken = tokenData.access_token as string;

  const url = new URL(
    `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`
  );
  url.searchParams.set("pageSize", String(limit));

  const reviewsRes = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 3600 },
  });

  const reviewsData = (await reviewsRes.json()) as ReviewsResponse;

  if (!reviewsRes.ok) {
    return NextResponse.json({ error: "Reviews fetch failed", details: reviewsData }, { status: 500 });
  }

  const reviews = (reviewsData.reviews || [])
    .filter((review) => review.comment)
    .sort((a, b) => {
      const aTime = a.updateTime ? new Date(a.updateTime).getTime() : 0;
      const bTime = b.updateTime ? new Date(b.updateTime).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, limit)
    .map((review, index) => ({
      id: index + 1,
      review: toNumberRating(review.starRating),
      text: review.comment || "",
      author: review.reviewer?.displayName || "Google user",
      avatar: review.reviewer?.profilePhotoUrl || "",
    }));

  return NextResponse.json({ reviews });
}
