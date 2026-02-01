import { NextResponse } from "next/server";

type AccountsResponse = {
  accounts?: { name?: string; accountName?: string; type?: string }[];
};

type LocationsResponse = {
  locations?: { name?: string; title?: string }[];
  nextPageToken?: string;
};

const getAccessToken = async () => {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing OAuth env vars");
  }

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
    throw new Error(JSON.stringify(tokenData));
  }

  return tokenData.access_token as string;
};

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const accountsRes = await fetch("https://mybusinessaccountmanagement.googleapis.com/v1/accounts", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const accountsData = (await accountsRes.json()) as AccountsResponse;

    if (!accountsRes.ok) {
      return NextResponse.json({ error: "Accounts fetch failed", details: accountsData }, { status: 500 });
    }

    const accounts = (accountsData.accounts || []).map((acc) => ({
      name: acc.name || "",
      accountId: acc.name ? acc.name.split("/").pop() : "",
      accountName: acc.accountName || "",
      type: acc.type || "",
    }));

    const locationsByAccount = await Promise.all(
      accounts.map(async (acc) => {
        if (!acc.accountId) return { accountId: "", locations: [] };
        const url = `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${acc.accountId}/locations`;
        const locRes = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const locData = (await locRes.json()) as LocationsResponse;
        const locations = (locData.locations || []).map((loc) => ({
          name: loc.name || "",
          locationId: loc.name ? loc.name.split("/").pop() : "",
          title: loc.title || "",
        }));
        return { accountId: acc.accountId, locations };
      })
    );

    return NextResponse.json({ accounts, locationsByAccount });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load business ids", details: String(error) }, { status: 500 });
  }
}
