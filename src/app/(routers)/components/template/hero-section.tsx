import BrandsLogo from "@/app/(routers)/components/organisms/marque-brand";
import images from "../../../constant/data-image";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Poppins({ subsets: ["latin"], weight: "400" });
const HeroSection = () => {
  return (
    <div className={inter.className}>
      <section className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 lg:px-12 md:px-8 px-6 bg-gray-100 py-6 ">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl text-neutral-900 font-bold max-w-sm leading-tight">
            Find the Best Laptop & PC for Your Every Need
          </h1>
          <p className="text-xs text-gray-400 max-w-lg py-2">
            Are you looking for the latest laptop for maximum productivity? Or
            maybe you want to upgrade your gaming experience with a powerful PC?
            At Jajan yuk, we offer a wide selection of high-quality laptops,
            PCs, and accessories designed to meet all your technology needs.
          </p>
          <Link href='/shop'>
            <button className="px-6 h-10 rounded-full bg-neutral-800 text-white text-sm mt-4 max-w-max">
              Go Shopp
            </button>
          </Link>
        </div>
        <div>
          <Image src={images.file} alt="file" />
        </div>
      </section>
      <BrandsLogo />
    </div>
  );
};

export default HeroSection;
