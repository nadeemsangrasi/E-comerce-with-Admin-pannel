import Wrapper from "@/components/shared/Wrapper";
import Image from "next/image";
import React from "react";
import img from "@/assets/images/sectionsImages/Mobile app.png";
import logo1 from "@/assets/logos/Rectangle 55.png";
import logo2 from "@/assets/logos/Rectangle 18.png";
const VoucherSection = () => {
  return (
    <Wrapper>
      <div className="mx-auto" id="mobile">
        <div className=" md:flex items-center justify-center gap-8">
          <div className="md:w-[35%] space-y-4  text-center md:text-left">
            <h3 className="text-3xl md:text-5xl font-bold leading-10 md:leading-[60px]">
              DOWNLOAD APP & <br /> GET THE VOUCHER!
            </h3>
            <p className="text-lg text-gray-600 font-medium">
              Get 30% off for first transaction using Rondovision mobile app for
              now.
            </p>
            <div className="flex gap-2 items-center justify-center md:justify-start">
              <Image src={logo1} alt="apple store logo" className="w-32" />
              <Image src={logo2} alt="google play logo" className="w-32" />
            </div>
          </div>
          <div className="md:w-[30%] mx-auto sm:mx-0">
            <Image src={img} alt="mobile app" className="w-fit" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default VoucherSection;
