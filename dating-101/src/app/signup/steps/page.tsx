"use client";

import { useSearchParams } from "next/navigation";
import SignUpPasswordStep from "../../../components/forms/password/signup-password-step";
import About from "@/components/steps/about";
import Password from "@/components/steps/passoword";

export default function SignUpSteps() {
  const searchParams = useSearchParams();

  const step = searchParams.get("step");

  let progressBarWidth: string = "";

  switch (step) {
    case "1":
      progressBarWidth = "w-1/2";
      break;

    case "2":
      progressBarWidth = "w-full";
  }

  return (
    <div className="flex flex-col">
      <div className="bg-gray-300">
        <div className={`bg-red-400 ${progressBarWidth} h-1`}></div>
      </div>
      {step === "1" ? <Password /> : <About />}
    </div>
  );
}
