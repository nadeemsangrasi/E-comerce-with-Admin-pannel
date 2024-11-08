// import { IProduct } from "@/types/types";
// import Image from "next/image";
// import React from "react";

// //ssg implementation
// export const generateStaticParams = async () => {
//   const response = await fetch("https://dummyjson.com/products");
//   const data = await response.json();
//   return data.products.map((product: IProduct) => ({
//     product_id: product.id.toString(),
//   }));
// };

// const ProductDetailsPage = async ({
//   // params,
// }: {
//   params: { product_id: string };
// }) => {
//   // let { product_id } = params;
//   // const cartData: IProduct = await fetchProductById(product_id);
//   // let randomNum: number = Math.floor(Math.random() * cartData.images.length);

//   return (
//     <>
//       <div className="container mx-auto  my-6 pt-20 ">
//         <div className=" md:flex justify-between break-words ">
//           <Image
//             className="w-fit md:w-[50%] h-fit"
//             src={cartData.images[randomNum]}
//             alt="image"
//             height={100}
//             width={1000}
//           />{" "}
//           <div className="px-16 pt-4 lg:pt-0 w-full md:w-[50%]">
//             <h1 className="text-[2.8rem] md:text-4xl font-bold leading-[55px] py-4 lg:py-0">
//               {cartData.description}
//             </h1>
//             <p className="font-semibold pt-2 text-2xl">Title</p>
//             <h1 className="font-light pt-1 text-[22px]">{cartData.title}</h1>
//             <p className="font-semibold pt-2 text-2xl">Brand</p>
//             <h1 className="font-light pt-1 text-[22px]">{cartData.brand}</h1>
//             <p className="font-semibold pt-2 text-2xl ">Category</p>
//             <h1 className="font-light pt-1 text-[22px]">{cartData.category}</h1>
//             <p className="font-semibold pt-2 text-2xl">Stock</p>
//             <h1 className="font-light pt-1 text-[22px]">{cartData.stock}</h1>
//             <p className="font-semibold pt-2 text-2xl">Price</p>
//             <h1 className="font-light pt-1 text-[22px]">${cartData.price}</h1>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetailsPage;

export default function page() {
  return <div>aa</div>;
}
