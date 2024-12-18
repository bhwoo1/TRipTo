import LocationCarosuel from "@/components/LocationCarousel";
import ShowYourLocation from "@/components/ShowYourLocation";
import TagCarousel from "@/components/TagCarousel";

export default function Home() {
  return (
    <div className="w-full">
      <ShowYourLocation />
      <div className="w-full flex justify-center items-center mt-24">
        <LocationCarosuel />
      </div>
      <div className="w-full flex justify-center items-center mt-24">
        <TagCarousel />
      </div>
    </div>
  );
}
