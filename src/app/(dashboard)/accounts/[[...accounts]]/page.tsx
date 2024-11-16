import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const UserProfilePage = () => {
  const { userId } = auth();
  const isUser = !!userId;

  if (!isUser) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex items-center justify-center mx-16 py-5">
      <UserProfile path="/accounts" />
    </div>
  );
};
export default UserProfilePage;
