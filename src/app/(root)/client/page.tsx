"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const ClientPage = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="flex  items-center justify-center h-screen">
      {isLoaded ? (
        <p>
          hello,{user?.firstName}
          {user?.lastName}
          {user?.id}
          <Image
            src={user?.imageUrl || ""}
            alt="profile image"
            height={1000}
            width={1000}
          />
          {user?.username}
        </p>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default ClientPage;
