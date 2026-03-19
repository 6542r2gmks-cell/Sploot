import { NextResponse } from "next/server";

type InterestPayload = {
  email?: string;
  name?: string;
  focus?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as InterestPayload;

  if (!payload.email || !payload.email.includes("@")) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    status: "accepted",
    message:
      "Thanks. This proof of concept does not persist signups yet, but the request shape is ready for a Supabase-backed waitlist.",
    received: {
      email: payload.email,
      name: payload.name ?? null,
      focus: payload.focus ?? "general",
    },
  });
}
