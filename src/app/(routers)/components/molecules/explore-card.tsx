"use client";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "./style.css";
import { Bookmark } from "lucide-react";
import Currency from "./../organisms/currency";
import _ from "lodash";


interface FilterItem {
  id: string;
  name: string;
}

interface DataItem {
  id: string;
  category: {
    id: string;
  };
  images: Array<{ url: string }>;
  name: string;
  description: string;
  price: number;
}

interface OptionCardProps {
  data: DataItem[];
  filter: FilterItem[];
  goDetail: (id: string) => void;
//   ref: React.RefObject<any>;
}

export default function OptionCard({ data, filter, goDetail, }: OptionCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | "All">("All");
  const [selected, setActive] = useState<string>("All");

  const handleCategoryChange = (category: string, id: string) => {
    setSelectedCategory(category);
    setActive(id);
  };

  const sliderRef = useRef<Slider | null>(null);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const filteredItems =
    selectedCategory === "All"
      ? _.uniqBy(data, "id")
      : data.filter((item) => item.category.id === selectedCategory);

  return (
    <div className="overflow-hidden">
      <div className="flex flex-wrap gap-4 mb-4">
        {filter.map((fltr) => (
          <button
            key={fltr.id}
            onClick={() => handleCategoryChange(fltr.id, fltr.id)}
            className={`${
              selected === fltr.id
                ? "bg-neutral-100 border border-neutral-200 rounded-full"
                : "bg-white"
            } px-4 h-8 rounded-full flex items-center gap-2`}
          >
            <p
              className={`${
                selected === fltr.id ? "text-[#6D14B3]" : "text-gray-400"
              } text-xs`}
            >
              {fltr.name}
            </p>
          </button>
        ))}
      </div>
      <div>
        <Slider {...settings} ref={sliderRef} className="w-full">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-2 cursor-pointer flex items-center w-full rounded-lg relative border border-neutral-200"
            >
              <div className="w-full h-[200px] bg-neutral-100 rounded-t-lg flex items-center justify-center">
                <div className="p-2 bg-white rounded-full absolute top-4 right-4">
                  <Bookmark width={20} height={20} />
                </div>
                <Image
                  src={item.images?.[0]?.url || "/fallback-image.jpg"}
                  alt={item.name}
                  property="tes"
                  className="rounded-xl w-[100px] h-[100px]"
                  width={100}
                  height={100}
                />
              </div>
              <div className="w-full h-[150px] bg-white px-6 py-4">
                <div className="space-y-2">
                  <h1 className="text-neutral-800 text-xs font-medium">
                    {item.name}
                  </h1>
                  <p className="text-neutral-700 text-xs truncate">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <Currency
                    value={item.price}
                    className="text-sm font-bold"
                  />
                  <button
                    onClick={() => goDetail(item.id)}
                    className="text-xs font-semibold text-blue-500"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

