"use client";
import { ClerkLoading, ClerkLoaded, useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
export default function Home() {
  const { user, loading } = useUser();
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
        </div>
      </ClerkLoaded>
    </div>
  );
}
