import { NextApiRequest, NextApiResponse } from "next";
import fs, { readFileSync } from "fs";
import formidable from "formidable";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { signUp } from "@/app/actions/action";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const formData = await req.formData();

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  const file = formData.get("profileImage") as File;
  const emailAddress = formData.get("email") as string;

  const buffer = await file.arrayBuffer();

  const nodeBuffer = Buffer.from(buffer);

  const profileImageKey = emailAddress + "-" + file.name;

  const params = {
    Bucket: process.env.AWS_BUCKET as string,
    Key: profileImageKey,
    Body: nodeBuffer,
  };

  try {
    await s3.upload(params).promise();
  } catch (err: any) {
    return Response.json({ err });
  }

  const profileImageUrl = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${profileImageKey}`;

  formData.append("profileImageUrl", profileImageUrl);

  const user = await signUp(formData);

  return Response.json({
    user: {
      email: user.email,
      profileImageUrl: user.profileImage,
    },
  });
}
