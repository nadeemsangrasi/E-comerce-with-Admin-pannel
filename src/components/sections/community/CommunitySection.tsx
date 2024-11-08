import React from "react";

const CommunitySection = () => {
  return (
    <div className="py-16 bg-primary-yellow " id="community">
      <div className="md:w-1/2 mx-auto text-center space-y-3">
        <h1 className=" text-3xl md:text-4xl font-semibold text-primary-white dark:text-black">
          JOIN SHOPPING COMMUNITY TO GET MONTHLY PROMO
        </h1>
        <p className="text-primary-white text-sm md:text-lg dark:text-black">
          Type your email down below and be young wild generation
        </p>
        <div className="relative ">
          <input
            type="text"
            placeholder="Add your email here"
            className="pl-6 pr-16 py-4 rounded-md"
          />
          <button className="bg-primary-black dark:bg-white dark:text-black text-primary-white font-bold py-2 px-4 rounded absolute left-[65%] sm:left-[58%] top-2 ">
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
