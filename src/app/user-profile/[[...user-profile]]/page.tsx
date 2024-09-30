import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const UserProfilePage = () => {
  const { userId } = auth();
  const isUser = !!userId;

  if (!isUser) {
    return redirect("/sign-in");
  }

  return <UserProfile path="/user-profile" />;
};
export default UserProfilePage;
