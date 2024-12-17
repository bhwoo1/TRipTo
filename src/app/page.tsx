import LocationCarosuel from "@/components/LocationCarousel";
import TagCarousel from "@/components/TagCarousel";
import YourLocation from "@/components/YourLocation";

export default function Home() {

  return (
    <div className="w-full">
      <YourLocation />
      <div className="flex justify-center items-center mt-24">
        <LocationCarosuel />
      </div>
      <div className="flex justify-center items-center mt-24">
        <TagCarousel />
      </div>
    </div>
  );
}
