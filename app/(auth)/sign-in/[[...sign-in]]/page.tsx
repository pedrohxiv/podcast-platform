import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex-center glassmorphism-auth h-screen">
      <SignIn />
    </div>
  );
};

export default SignInPage;
