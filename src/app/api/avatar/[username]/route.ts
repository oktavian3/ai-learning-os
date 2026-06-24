import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const clean = username.replace(/^@+/, "").replace(/[^a-zA-Z0-9_]/g, "").slice(0, 15);

  if (!clean) {
    return NextResponse.json({ error: "username required" }, { status: 400 });
  }

  try {
    // Try unavatar.io (now redirects from /twitter/ to /x/)
    const res = await fetch(`https://unavatar.io/x/${clean}`, {
      redirect: "follow",
    });

    if (!res.ok) {
      return new NextResponse(null, { status: 404 });
    }

    const blob = await res.blob();
    const headers = new Headers();
    headers.set("Content-Type", blob.type || "image/jpeg");
    headers.set("Cache-Control", "public, max-age=86400");

    return new NextResponse(blob, { headers });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
