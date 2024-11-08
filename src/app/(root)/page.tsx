// "use client";
// import { ModeToggle } from "@/components/shared/ModeToggle";
// import { ClerkLoading, ClerkLoaded, useUser, UserButton } from "@clerk/nextjs";
// import axios from "axios";
// import Link from "next/link";
// import { useState } from "react";
// export default function Home() {
//   const { user, loading } = useUser();
//   const [items, setItems] = useState([
//     {
//       id: 9,
//     },
//     {
//       id: 104

//       80152.

//     },
//   ]);

//   const handleCheckOut = async () => {
//     const response = await axios.post("/api/checkout", {
//       cartIds: items.map((item: any) => item.id),
//     });

//     window.location = response.data.url;
//   };
//   return (
//     <div>
//       <ClerkLoading>
//         <div>loading</div>
//       </ClerkLoading>
//       <ClerkLoaded>
//         <div>
//           {user ? (
//             <p>
//               <Link href="/user-profile">profile</Link>
//               <Link href="/client">client</Link>
//               <li>

//                 <UserButton />
//               </li>

//            </p>
//           ) : (
//             <div>
//               {" "}
//               <ul>
//                 <li>
//                   <Link href="/sign-in">sign-in</Link>
//                 </li>
//                 <li>
//                   <Link href="/sign-up">sign-up</Link>
//                 </li>
//               </ul>
//             </div>
//           )}
//           <button onClick={handleCheckOut}>check out</button>
//           <ModeToggle />
//           <Link href="/dashboard">dashboard</Link>
//         </div>
//       </ClerkLoaded>
//     </div>
//   );
// }

import BannerSection from "@/components/sections/banner/BannerSection";
import BrandSection from "@/components/sections/brands/BrandSection";
import CommunitySection from "@/components/sections/community/CommunitySection";
import FeaturedSection from "@/components/sections/featured/FeaturedSection";
import HomeSection from "@/components/sections/home/HomeSection";
import NewArrivalSection from "@/components/sections/newArrival/NewArrivalSection";
import VoucherSection from "@/components/sections/voucehers/VoucherSection";
import YoungFavouriteSection from "@/components/sections/younFavourite/YounFavouriteSection";

export default function Home() {
  return (
    <div>
      <HomeSection />
      <BrandSection />
      <FeaturedSection />
      <NewArrivalSection />
      <BannerSection />
      <YoungFavouriteSection />
      <VoucherSection />
      <CommunitySection />
    </div>
  );
}
