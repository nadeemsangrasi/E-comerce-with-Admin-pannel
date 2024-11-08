import Wrapper from "@/components/shared/Wrapper";
import React from "react";
import Yimge1 from "@/assets/images/sectionsImages/Rectangle 50.png";
import Yimge2 from "@/assets/images/sectionsImages/Rectangle 49.png";
import { StaticImageData } from "next/image";
import Heading from "@/components/shared/Heading";

import YoungFavouriteCard from "./YoungFavouriteCard";

const youngFavourite: {
  image: StaticImageData;
  title: string;
}[] = [
  {
    image: Yimge1,
    title: "Trending on instagram",
  },
  {
    image: Yimge2,
    title: "All Under $40",
  },
];
const YoungFavouriteSection = () => {
  return (
    <Wrapper>
      <Heading label="Young's Favourite" />

      <div className="" id="young">
        <div className="flex py-16 flex-wrap gap-8 lg:gap-0 ">
          {youngFavourite.map(
            ({ image, title }: { image: StaticImageData; title: string }) => (
              <YoungFavouriteCard key={title} img={image} title={title} />
            )
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default YoungFavouriteSection;
