import { useEmailPassword } from "@/app/contexts/context";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export default function Password() {
  const { emailPassword, updateEmailPassword } = useEmailPassword();
  return (
    <div className="flex flex-col gap-y-10 pl-4 pr-10">
      <div className="flex flex-row gap-x-6 mt-5 gap-y-6">
        <button>
          <IoIosArrowBack size={25} />
        </button>

        <div className="flex flex-col justify-start items-start gap-y-1">
          <span>Step 1 of 3</span>
          <span>Password</span>
        </div>
      </div>

      <div className="flex flex-col gap-y-5">
        <label>Password</label>
        <input
          type="password"
          className="h-10"
          value={emailPassword.password}
          onChange={(e) =>
            updateEmailPassword({ ...emailPassword, password: e.target.value })
          }
        ></input>
      </div>
      <Link href={{ pathname: "/signup/steps", query: { step: "2" } }}>
        <button type="button" className="bg-red-400 h-14 rounded-xl w-full">
          Next
        </button>
      </Link>
    </div>
  );
}
