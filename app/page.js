import HeroSlider from "../components/HeroSlider";
import StudioCategories from "../components/StudioCategories";
import FeaturedStudios from "../components/FeaturedStudios"; // নতুন যোগ হলো
import HowItWorks from "../components/HowItWorks";
import HostGuarantee from "../components/HostGuarantee";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSlider />
      <StudioCategories />
      <FeaturedStudios /> {/* Categories-এর ঠিক নিচে বসানো হলো */}
      <HowItWorks />
      <HostGuarantee />
    </div>
  );
}