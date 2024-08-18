"use client";

import Button from "@/components/buttons/button";
import Input from "../../components/input/input";
import Link from "next/link";
import { useEmailPassword } from "../contexts/context";

export default function signUpEmailStep() {
  const { emailPassword, updateEmailPassword } = useEmailPassword();

  return (
    <div className="flex gap-y-16 flex-col">
      <h1 className="text-5xl">Sign up to start dating</h1>

      <div className="flex flex-col gap-y-2">
        <label> Email address</label>
        <input
          type="text"
          className="w-full h-10"
          value={emailPassword.email}
          onChange={(e) =>
            updateEmailPassword({ ...emailPassword, email: e.target.value })
          }
        ></input>
        <Link href={{ pathname: "signup/steps", query: { step: "1" } }}>
          <Button
            text="Continue"
            type="button"
            onClick={() => {}}
            customize="w-9/12 mt-4 h-14 rounded-3xl"
          />
        </Link>
      </div>
    </div>
  );
}
