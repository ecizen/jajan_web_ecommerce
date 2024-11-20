// public/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
  ) {

  try {
    if (!params.id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_GET]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
