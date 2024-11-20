// public/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
  
    try {
      const user = await db.product.findUnique({
        where: { id: id }, // Using `id` to fetch a product or perform any logic
      });
  
      if (user) {
        return NextResponse.json(user); // Returning the product data as JSON
      } else {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
      }
    } catch (error) {
      console.log("[ERROR]", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
  
