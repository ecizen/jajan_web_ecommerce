"use client";
import * as React from "react";
import GetCategory from "../../../../../actions/get-category";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface dataCategory {
    id: string;
    name: string
}
const MainNavLanding: React.FC = () => {
  const [categories, setCategories] = React.useState<dataCategory[]>([

  ]);

  React.useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await GetCategory();
      setCategories(fetchedProducts);
    };

    loadProducts();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-xs text-neutral-700">
        Categories
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        {categories.map((category) => (
          <div key={category.id}>
            <DropdownMenuItem>
              <a href={`/home/product/category/${category.id}`}>
                {category.name}
              </a>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MainNavLanding;
