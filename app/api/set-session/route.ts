import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { idToken } = await req.json();

  if (!idToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (idToken === "loggedout") {
    (await cookies()).delete("__session");
    return NextResponse.json({ message: "destroyed session" });
  }

  const verifyResponse = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    }
  );

  if (!verifyResponse.ok) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  (await cookies()).set("__session", idToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
