import { signUp } from "@/app/actions/action";
import { useEmailPassword, useUser } from "@/app/contexts/context";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaFileUpload } from "react-icons/fa";
import { useRouter } from "next/navigation";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type FormData = {
  name: string;
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
  gender: string;
  longitude: number;
  latitude: number;
  profileImage: File | null;
};

export default function About() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    dayOfBirth: "",
    monthOfBirth: "January",
    yearOfBirth: "",
    gender: "Male",
    longitude: 0,
    latitude: 0,
    profileImage: null,
  });

  const { emailPassword, updateEmailPassword } = useEmailPassword();

  const router = useRouter()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        (error) => console.log(`Unable to get location:${error}`)
      );
    } else {
      console.log("Browser does not support location");
    }
  }, []);

  const onSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDataHTML = new FormData();

    formDataHTML.append("name", formData.name);
    formDataHTML.append("email", emailPassword.email);
    formDataHTML.append("password", emailPassword.password);
    formDataHTML.append(
      "dateOfBirth",
      formData.yearOfBirth +
        "-" +
        formData.monthOfBirth +
        "-" +
        formData.dayOfBirth
    );
    formDataHTML.append("gender", formData.gender);

    formDataHTML.append("longitude", formData.longitude.toString());
    formDataHTML.append("latitude", formData.latitude.toString());
    formDataHTML.append("profileImage", formData.profileImage!);

    const result = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: formDataHTML,
    });

    const userData = await result.json();

    const { user, updateUser } = useUser();

    updateUser(userData);

    router.push("/home");
  };

  return (
    <div className="flex flex-col gap-y-10 pl-4 pr-10 pb-12">
      <div className="flex flex-row gap-x-6 mt-5 gap-y-6">
        <button>
          <IoIosArrowBack size={25} />
        </button>

        <div className="flex flex-col justify-start items-start gap-y-1">
          <span>Step 2 of 3</span>
          <span>About</span>
        </div>
      </div>

      <form className="flex flex-col gap-y-8" onSubmit={onSignUp}>
        <div className="flex flex-col gap-y-5">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="h-10"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          ></input>
        </div>
        <div className="flex flex-col gap-y-5">
          <label>Date of birth</label>
          <div className="flex flex-row gap-x-3">
            <input
              type="text"
              className="w-1/3 h-10"
              value={formData.dayOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dayOfBirth: e.target.value })
              }
            ></input>
            <select
              className="w-2/3"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  monthOfBirth: e.target.value,
                });
              }}
            >
              {MONTHS.map((month, index) => (
                <option key={index}>{month}</option>
              ))}
            </select>
            <input
              type="text"
              className="w-1/3"
              value={formData.yearOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, yearOfBirth: e.target.value })
              }
            ></input>
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <label>Gender</label>
          <div className="flex flex-row gap-x-5">
            <div className="flex flex-row gap-x-2">
              <input
                type="radio"
                checked={formData.gender == "Male"}
                value="Male"
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              <span>Male</span>
            </div>

            <div className="flex flex-row gap-x-2">
              <input
                type="radio"
                value="Female"
                checked={formData.gender == "Female"}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              <span>Female</span>
            </div>

            <div className="flex flex-row gap-x-2">
              <input
                type="radio"
                value="Prefer not to say"
                checked={formData.gender == "Prefer not to say"}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              <span>Prefer not to say</span>
            </div>
          </div>
        </div>

        <button type="submit" className="bg-red-400 h-14 rounded-xl">
          Sign up
        </button>

        <div className="bg-red-400 p-3 h-52 relative">
          <div className=" flex flex-col gap-y-7 items-center justify-center border-dashed border-2 border-red-700 w-full h-full">
            <FaFileUpload size={50} className="text-white" />
            <span>
              {formData.profileImage?.name
                ? formData.profileImage?.name
                : "Choose a profile image"}
            </span>
          </div>
          <input
            type="file"
            className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-auto"
            onChange={(e) => {
              setFormData({ ...formData, profileImage: e.target.files![0] });
            }}
          ></input>
        </div>
      </form>
    </div>
  );
}
