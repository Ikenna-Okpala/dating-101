"use client";

import Image from "next/image";
import LogoIcon from "../../../public/logo.svg";
import Link from "next/link";
import Button from "../buttons/button";
import Input from "../input/input";
import { login } from "@/app/actions/action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/contexts/context";

type EmailPasswordType = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [emailPassword, setEmailPassword] = useState<EmailPasswordType>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const { user, updateUser } = useUser();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", emailPassword.email);
    formData.append("password", emailPassword.password);

    const userData = await login(formData);

    updateUser(userData);

    router.push("/home");
  };
  return (
    <form onSubmit={onLogin} className="w-1/3 h-full mt-8 mb-8">
      <div className="w-full h-full flex flex-col items-center bg-white rounded-2xl space-y-5">
        <Image
          priority
          src={LogoIcon}
          alt="Our logo"
          color="#fd3eea"
          width={100}
          height={200}
          className=""
        />
        <div className="flex flex-col px-5 w-full -mb-28">
          <div className="flex flex-col gap-3">
            <label> Email </label>
            <input
              type="text"
              name="name"
              className="h-10 bg-gray-300"
              value={emailPassword.email}
              onChange={(e) =>
                setEmailPassword({ ...emailPassword, email: e.target.value })
              }
            ></input>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <label> Password </label>
            <input
              type="text"
              name="name"
              className="h-10 bg-gray-300"
              value={emailPassword.password}
              onChange={(e) =>
                setEmailPassword({ ...emailPassword, password: e.target.value })
              }
            ></input>
          </div>

          <div className="flex flex-row justify-end text-sm mt-3 underline underline-offset-2 text-red-400">
            <Link href="/">Forgot password?</Link>
          </div>

          <div className="flex justify-center mt-10">
            <Button type="submit" text="login" onClick={() => {}} />
          </div>

          <div className="flex flex-row mt-7 text-xs justify-center gap-x-1">
            <span>Don't have an account yet?</span>
            <Link
              href="/"
              className="underline underline-offset-2 text-red-400"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
