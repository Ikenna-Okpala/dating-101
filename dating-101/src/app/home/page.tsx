"use client";

import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { IoHeartCircleSharp } from "react-icons/io5";
import { BsFillChatHeartFill } from "react-icons/bs";
import {
  JWTEmailInterface,
  authorize,
  invalidateToken,
} from "../actions/action";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const onSignOut = () => {
    invalidateToken();
    router.push("/login");
  };

  return (
    <div className="grid grid-cols-3 h-screen w-screen pt-10 pl-10 pr-6 pb-10">
      <div className="row-auto flex flex-col justify-between">
        <div className="group w-32">
          <img
            src="/sample.jpg"
            className="w-16 h-16 object-cover border-2 border-white rounded-full absolute top-12"
          ></img>
          <div className="hidden group-hover:block divide-y divide-solid bg-white mt-7 divide-gray-900">
            <button className="w-full h-16">Update profile</button>
            <button className="w-full h-16" onClick={onSignOut}>
              Sign out
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between h-1/2">
          <span>Matches</span>

          <div className="flex flex-col">
            <div className="flex flex-col relative h-52">
              <img
                src="/sample.jpg"
                className="w-16 h-16 object-cover border-2 border-white rounded-full absolute"
              ></img>

              <img
                src="/sample.jpg"
                className="w-16 h-16 object-cover border-2 border-white rounded-full absolute top-12"
              ></img>

              <img
                src="/sample.jpg"
                className="w-16 h-16 object-cover border-2 border-white rounded-full absolute top-24"
              ></img>

              <img
                src="/sample.jpg"
                className="w-16 h-16 object-cover border-2 border-white rounded-full absolute top-36"
              ></img>
            </div>
            <span>+4 others</span>
          </div>
        </div>
      </div>
      <div className="row-auto">
        <div className="flex flex-col gap-y-10 w-full h-full">
          <div className="flex justify-around">
            <button className="bg-pink-400 w-40 h-14 rounded-full">
              For you
            </button>
            <button className="bg-black w-40 h-14 text-white rounded-full">
              Matches
            </button>
          </div>
          <img
            src="/sample-profile-pic.jpg"
            className="w-full max-h-96 object-cover rounded-3xl"
          ></img>

          <div className="flex gap-x-8 justify-center">
            <button>
              <MdCancel className="text-red-600 w-28 h-28" />
            </button>

            <button>
              <IoHeartCircleSharp className="text-pink-500 w-28 h-28" />
            </button>
          </div>
        </div>
      </div>
      <div className="row-auto">
        <div className="flex w-full justify-end">
          <div className="flex justify-center gap-x-5">
            <span>8 msgs</span>
            <button>
              <BsFillChatHeartFill className="text-pink-500 w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
