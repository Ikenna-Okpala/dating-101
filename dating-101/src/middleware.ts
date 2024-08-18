import { NextRequest } from "next/server";
import { authorize } from "./app/actions/action";

export async function middleware(request: NextRequest) {
  console.log("verifying .....");

  await fetch("http://localhost:3000/api/auth", {
    method: "POST",
  });
}

export const config = {
  matcher: ["/home/:path*"],
};
