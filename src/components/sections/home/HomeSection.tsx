import Image from "next/image";
import Wrapper from "@/components/shared/Wrapper";
import homeImage from "@/assets/images/sectionsImages/home-img.png";

import { Button } from "@/components/ui/button";
const HomePage = () => {
  return (
    <Wrapper>
      <div className=" flex flex-col md:flex-row items-center justify-center my-6 rounded-lg  bg-secondary-gray  dark:bg-gray-800 py-6 lg:py-0">
        <div className="space-y-4  text-center sm:text-left ">
          <div className="text-5xl sm:text-6xl font-bold flex flex-col w-fit gap-2 mx-auto sm:mx-0">
            <span className="bg-white  dark:text-black p-2 ">LET&apos;S</span>
            EXPLORE{" "}
            <span className="bg-primary-yellow p-2 -rotate-2 text-black ">
              UNIQUE
            </span>{" "}
            CLOTHES.
          </div>

          <p className="text-medium">
            Live for Influential and Innovative fashion!
          </p>
          <Button>Shop Now</Button>
        </div>
        <div className="sm:px-4 md:w-1/2 mt-10 md:mt-0">
          <Image
            src={homeImage}
            alt="Featured Product"
            height={1000}
            width={1000}
            className="w-full h-full "
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default HomePage;
