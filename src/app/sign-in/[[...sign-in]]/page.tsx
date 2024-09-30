import { SignIn } from "@clerk/nextjs";

export default function SingInPage() {
  return <SignIn afterSignOutUrl={"/"} />;
}
