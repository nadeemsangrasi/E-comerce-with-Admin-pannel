import Wrapper from "@/components/shared/Wrapper";
import React from "react";
import Aimge1 from "@/assets/images/sectionsImages/Rectangle 20.png";
import Aimge2 from "@/assets/images/sectionsImages/Rectangle 21.png";
import Aimge3 from "@/assets/images/sectionsImages/Rectangle 22.png";
import { StaticImageData } from "next/image";
import Heading from "@/components/shared/Heading";
import NewArrivalCard from "./NewArrivalCard";
const newArrival: {
  image: StaticImageData;
  title: string;
}[] = [
  {
    image: Aimge1,
    title: "Hoodies & Sweetshirts",
  },
  {
    image: Aimge2,
    title: "Coats & Parkas",
  },
  {
    image: Aimge3,
    title: "Tees & T-Shirt",
  },
];
const NewArrivalSection = () => {
  return (
    <Wrapper>
      <div className="" id="new">
        <Heading label="New Arrivals" />

        <div className="flex py-16 justify-between flex-wrap gap-8 lg:gap-0">
          {newArrival.map(
            ({ image, title }: { image: StaticImageData; title: string }) => (
              <NewArrivalCard key={title} img={image} title={title} />
            )
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default NewArrivalSection;
