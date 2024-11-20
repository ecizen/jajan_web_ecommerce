// public/api/products.js
import { NextResponse } from "next/server";
import db from "@/lib/db";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 });

export async function GET(req : Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search"); 
    const categoryId = searchParams.get("category");

    const cacheKey = `products_${search || ""}_${categoryId || ""}`;
    const cachedProducts = cache.get(cacheKey);

    if (cachedProducts) {
        console.log("Returning cached products");
        return NextResponse.json(cachedProducts);
      }

    const products = await db.product.findMany({
      where: {
        isArchived: false,
        ...(categoryId && { categoryId }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { category: { name: { contains: search, mode: "insensitive" } } },
          ],
        }),
      },
      include: {
        images: true,
        category: true,
        store: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    cache.set(cacheKey, products);

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

