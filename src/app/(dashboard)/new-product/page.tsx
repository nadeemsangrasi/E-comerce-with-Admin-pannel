import DashboardPagesWrapper from "@/components/dashboard/DashboardPagesWrapper";
import { Trash, Trash2, Upload } from "lucide-react";
import React from "react";
import img from "@/assets/home-4.jpg";
import Image from "next/image";
const NewProduct = () => {
  return (
    <DashboardPagesWrapper>
      <div className="space-y-4">
        <div>
          <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
            Create Product
          </h1>
          <h4 className="text-gray-500 text-base font-medium dark:text-gray-400 mb-1">
            Fill out the form below to create a new product
          </h4>
          <hr />
        </div>
        <div className="space-y-2">
          <h4 className="text-black font-semibold text-lg ">Images</h4>
          <div className="flex gap-2">
            <span className="relative cursor-pointer">
              <Image src={img} alt="img" className="w-[240px] rounded-md" />
              <Trash
                className="text-black font-semibold absolute top-4 right-5"
                fill="red"
              />
            </span>
            <span className="relative cursor-pointer">
              <Image src={img} alt="img" className="w-[240px] rounded-md" />
              <Trash
                className="text-black font-semibold absolute top-4 right-5"
                fill="red"
              />
            </span>
            <span className="relative cursor-pointer">
              <Image src={img} alt="img" className="w-[240px] rounded-md" />
              <Trash
                className="text-black font-semibold absolute top-4 right-5"
                fill="red"
              />
            </span>
          </div>
          <div className="pt-3">
            <label
              htmlFor="file"
              className="cursor-pointer flex items-center border-2 border-dashed p-2 rounded-lg w-fit bg-gray-300 text-black"
            >
              {/* {isPublishing ? (
                  <Loader2
                    size={30}
                    strokeWidth={3}
                    absoluteStrokeWidth
                    className="inline mx-2"
                  />
                ) : ( */}
              {/* <> */}
              <Upload
                size={20}
                strokeWidth={3}
                absoluteStrokeWidth
                className="inline mx-2"
              />
              {/* </> */}
              {/* )} */}
              <span className="text-xl  font-bold">
                {/* {isUploading ? "Uploading..." : "Upload Image"} */}
                Upload Image
              </span>
            </label>

            <input
              type="file"
              // onChange={(e) => setFile(e.target.files?.[0] || null)}
              accept="image/*"
              id="file"
              className="hidden"
            />
          </div>
        </div>
      </div>
    </DashboardPagesWrapper>
  );
};

export default NewProduct;
