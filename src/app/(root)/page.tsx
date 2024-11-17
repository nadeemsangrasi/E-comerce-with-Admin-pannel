import BannerSection from "@/components/sections/banner/BannerSection";
import BrandSection from "@/components/sections/brands/BrandSection";
import CommunitySection from "@/components/sections/community/CommunitySection";
import FeaturedSection from "@/components/sections/featured/FeaturedSection";
import HomeSection from "@/components/sections/home/HomeSection";
import NewArrivalSection from "@/components/sections/newArrival/NewArrivalSection";
import VoucherSection from "@/components/sections/voucehers/VoucherSection";
import YoungFavouriteSection from "@/components/sections/younFavourite/YounFavouriteSection";

export default function Home() {
  return (
    <div>
      <HomeSection />
      <BrandSection />
      <FeaturedSection />
      <NewArrivalSection />
      <BannerSection />
      <YoungFavouriteSection />
      <VoucherSection />
      <CommunitySection />
    </div>
  );
}
