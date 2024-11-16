import Wrapper from "@/components/shared/Wrapper";
import React from "react";
import Aimge1 from "@/assets/images/sectionsImages/Rectangle 20.png";
import Aimge2 from "@/assets/images/sectionsImages/Rectangle 21.png";
import Aimge3 from "@/assets/images/sectionsImages/Rectangle 22.png";
import { StaticImageData } from "next/image";
import Heading from "@/components/shared/Heading";
import NewArrivalCard from "./NewArrivalCard";
import Link from "next/link";
const newArrival: {
  image: StaticImageData;
  title: string;
  cat: string;
}[] = [
  {
    image: Aimge1,
    title: "Sports & Outdoors",
    cat: "sports-outdoors",
  },
  {
    image: Aimge2,
    title: "Fashion",
    cat: "fasion",
  },
  {
    image: Aimge3,
    title: "Tees & T-Shirt",
    cat: "tees-t-shirt",
  },
];
const NewArrivalSection = () => {
  return (
    <Wrapper>
      <div id="new">
        <Heading label="New Arrivals" className="text-3xl sm:text-3xl" />
        <div className="flex py-16 justify-between flex-wrap gap-8 lg:gap-0">
          {newArrival.map(
            ({
              image,
              title,
              cat,
            }: {
              image: StaticImageData;
              title: string;
              cat: string;
            }) => (
              <Link href={"/category/" + cat} key={cat}>
                <NewArrivalCard key={title} img={image} title={title} />
              </Link>
            )
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default NewArrivalSection;
