"use client";
import { ClerkLoading, ClerkLoaded, useUser, UserButton } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
export default function Home() {
  const { user, loading } = useUser();
  const [items, setItems] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ]);

  const handleCheckOut = async () => {
    const response = await axios.post("/api/checkout", {
      productIds: items.map((item: any) => item.id),
    });

    window.location = response.data.url;
  };
  return (
    <div>
      <ClerkLoading>
        <div>loading</div>
      </ClerkLoading>
      <ClerkLoaded>
        <div>
          {user ? (
            <p>
              <Link href="/user-profile">profile</Link>
              <Link href="/client">client</Link>
              <li>
                <UserButton />
              </li>
            </p>
          ) : (
            <div>
              {" "}
              <ul>
                <li>
                  <Link href="/sign-in">sign-in</Link>
                </li>
                <li>
                  <Link href="/sign-up">sign-up</Link>
                </li>
              </ul>
            </div>
          )}
          <button onClick={handleCheckOut}>check out</button>
        </div>
      </ClerkLoaded>
    </div>
  );
}
