import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex-center glassmorphism-auth h-screen">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
