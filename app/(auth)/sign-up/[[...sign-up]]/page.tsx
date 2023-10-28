"use client";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [termsChecked, setTermsChecked] = useState(false);
  // if user agrees terms and conditions activate signup field
  const handleCheckboxChange = (e: any) => {
    setTermsChecked(e.target.checked);
  };

  const handleImageClick = () => {
    if (!termsChecked) {
      toast.error("Please agree to the terms and conditions to proceed.");
    }
  };
  return (
    <div className="flex gap-5 h-screen flex-col justify-center items-center">
      <Toaster />
      <div
        style={{
          position: "relative",
          marginTop: "1rem",
          display: "inline-block",
        }}
      >
        <div style={{ marginTop: "1rem" }}>
          {termsChecked ? (
            <SignUp />
          ) : (
            <Image
              src="/assets/images/sign-up.png"
              width={490}
              height={580}
              alt="Sign Up"
              className="opacity-50 object-contain"
              onClick={handleImageClick}
            />
          )}
        </div>
      </div>
      <div>
        <label>
          <input type="checkbox" onChange={handleCheckboxChange} />I agree to
          the terms and conditions
        </label>
      </div>
    </div>
  );
}
