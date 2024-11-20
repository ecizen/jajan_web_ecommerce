
import HeroSection from "./components/template/hero-section";
import ProductForYou from "./components/organisms/product-for-you";
import BenefitSection from "./components/template/benefit-section";
import WyhCoosMeSection from "./components/template/why-coose";
import BestProduct from "./components/template/best-product";
import TestimonialSection from "./components/template/testimonial-section";

export default function Home() {
  return (
   <>
     <HeroSection />
     <ProductForYou />
     <BenefitSection />
     <WyhCoosMeSection />
     <BestProduct/>
     <TestimonialSection/>
   </>
  );
}
