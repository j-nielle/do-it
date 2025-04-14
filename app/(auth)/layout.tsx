import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center pt-12">
      {children}
    </div>
  );
}
