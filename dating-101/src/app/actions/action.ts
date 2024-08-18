"use server";
import { cookies } from "next/headers";

import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import db from "../../../db/db.config";
import { blacklist, users } from "../../../db/schema";

const SALT_ROUNDS = 10;

export const signUp = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const dateOfBirth = formData.get("dateOfBirth") as string;
  const gender = formData.get("gender") as string;
  const longitude = +(formData.get("longitude") as string);
  const latitude = +(formData.get("latitude") as string);
  const profileImageUrl = formData.get("profileImageUrl") as string;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
      longitude,
      latitude,
      profileImage: profileImageUrl,
    })
    .returning();

  const token = await new SignJWT({ user: email })
    .setProtectedHeader({
      alg: "H256",
    })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));

  cookies().set({
    name: "access_token",
    value: token,
    httpOnly: true,
  });

  return user[0];
};

export async function login(formData: FormData) {
  //as keyword is for type assertions: treat variable as a specific type

  try {
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;

    const result = await db.select().from(users).where(eq(users.email, email));

    if (result.length == 0) {
      throw Error("invalid credentials");
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("invalid credentials");
    }

    const token = await new SignJWT({ user: email }).sign(
      new TextEncoder().encode(process.env.JWT_SECRET as string)
    );

    cookies().set({
      name: "access_token",
      value: token,
      httpOnly: true,
    });

    console.log("token set");

    return {
      email: user.email,
      profileImageUrl: user.profileImage!!,
    };
  } catch (error) {
    console.log(error);

    throw new Error("Invalid credentials");
  }
}

export interface JWTEmailInterface {
  email: string;
}

export async function authorize() {
  const cookie_access_token = cookies().get("access_token");

  if (!cookie_access_token) {
    throw new Error("Unauthorized");
  }

  const checkIfTokenIsBlacklisted = await isTokenBlacklisted(
    cookie_access_token.value
  );

  if (checkIfTokenIsBlacklisted) {
    throw new Error("Unauthorized");
  }

  try {
    const verified = await jwtVerify(
      cookie_access_token.value,
      new TextEncoder().encode(process.env.JWT_SECRET as string)
    );
  } catch {
    throw new Error("Invalid credentials");
  }
}

async function isTokenBlacklisted(access_token: string) {
  const result = await db
    .select()
    .from(blacklist)
    .where(eq(blacklist.access_token, access_token));

  return result.length != 0;
}

export async function invalidateToken() {
  const cookie_access_token = cookies().get("access_token");

  if (!cookie_access_token) {
    return;
  }

  const checkIfTokenIsBlacklisted = await isTokenBlacklisted(
    cookie_access_token.value
  );

  if (checkIfTokenIsBlacklisted) {
    return;
  }

  await db.insert(blacklist).values({
    access_token: cookie_access_token.value,
  });

  cookies().delete("access_token");
}
