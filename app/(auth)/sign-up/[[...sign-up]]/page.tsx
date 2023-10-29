"use client";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [termsChecked, setTermsChecked] = useState(false);

  useEffect(() => {
    // Check if terms have been agreed to in local storage
    const storedTermsAgreement = localStorage.getItem("termsAgreed") === "true";
    setTermsChecked(storedTermsAgreement);
  }, []);

  const handleCheckboxChange = (e: any) => {
    const isChecked = e.target.checked;
    setTermsChecked(isChecked);
    localStorage.setItem("termsAgreed", isChecked.toString());
  };

  const handleImageClick = () => {
    if (!termsChecked) {
      toast.error("Please agree to the terms and conditions to Sign-up.");
    }
  };

  return (
    <div className="flex gap-5 h-screen flex-col justify-center items-center">
      <Toaster />
      <Image
        src="/assets/images/auth.jpg"
        fill
        alt="auth image"
        className="object-cover absolute" // Adjust according to your needs
      />
      <div className="flex p-[3vmin] flex-wrap relative z-10 gap-5 items-center justify-center">
        <div className="flex flex-col">
          <h1 className="font-extrabold xl:text-4xl lg:text-3xl xs:text-2xl">
            Sign up to start using app
          </h1>
          <h2>Your data is secured</h2>
          <h3 className="text-gray-500">
            Please agree to the terms and conditions to Sign-up
          </h3>
        </div>
      </div>
      <div
        style={{
          position: "relative",
          marginTop: "1rem",
          display: "inline-block",
        }}
      >
        <div style={{ marginTop: "1rem" }}>
          {termsChecked ? (
            <div className="opacity-100" onClick={handleImageClick}>
              <SignUp />
            </div>
          ) : (
            <Image
              src="/assets/images/sign-up.png"
              width={490}
              height={580}
              alt="Sign Up"
              className="opacity-50 object-contain rounded-2xl"
              onClick={handleImageClick}
            />
          )}
        </div>
      </div>
      <div className="relative z-10">
        <label>
          <input
            type="checkbox"
            checked={termsChecked}
            onChange={handleCheckboxChange}
          />{" "}
          I agree to the terms and conditions
        </label>
      </div>
    </div>
  );
}
