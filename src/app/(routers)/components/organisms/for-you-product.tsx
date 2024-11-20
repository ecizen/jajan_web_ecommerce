"use client";
import React, { useEffect, useState } from "react";
import GetProduct from "../../../../../actions/get-product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Currency from "./currency";
import { Expand, Map, MapIcon } from "lucide-react";


export interface Image {
    id: string;
    url: string;
}

interface product{
    id: string;
    name: string;
    price: number;
    description: string;
    images: Image[];
    location: string;
    isFeatured: boolean;
    isArchived: boolean;
}

const ForYou=() => {
  const router = useRouter();

  const handleClick = (productId: string) => {
    router.push(`/shop/${productId}`);
    console.log("data berhasil didapatkan", productId);
  };
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await GetProduct();
      setProducts(fetchedProducts);
      setLoading(false);


    };
    loadProducts();
  }, []);

  return (
    <div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-white cursor-pointer group  rounded-xl border p-3 space-y-4"
            >
              <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    onClick={() => handleClick(product.id)}
                    fill
                    alt="image"
                    src={product?.images?.[0]?.url || "/fallback-image.jpg"}  // Assuming images is an array of strings (URLs)
                    className="aspect-square object-cover rounded-md group-hover:brightness-50 group-hover:scale-105 transition-all ease-in-out duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="inset-x-0 absolute bottom-3 left-[40%] right-[50%] hidden group-hover:block transition-all duration-300 ease-in-out  ">
                  <div className=" bg-white h-8 w-8 rounded-full flex items-center justify-center opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out ">
                    <Expand />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold">{product.name}</p>
                <p className="text-xs text-black truncate mt-1 ">
                  {product.description}
                </p>
                <Currency
                  value={product?.price}
                  className="text-sm mt-2 text-purple-700"
                />
                <div className=" lg:flex  mt-4  sm:hidden hidden space-x-2 items-center">
                  <MapIcon className="" width={16} />
                  <p className="text-[12px] text-gray-900 ">
                    {product.location}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

export default ForYou;
