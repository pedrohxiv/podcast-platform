import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="relative h-screen w-full">
      <div className="absolute size-full">
        <Image
          src="/images/bg-img.png"
          fill
          alt="background"
          className="size-full"
        />
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
