import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const reqBody = await request.json();
  const { _id, name, email, comment, ImageURL } = await reqBody;
  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
      ImageURL,
    });
  } catch (error) {
    console.log("comment submitted Error:", error);
    return NextResponse.json({
      success: false,
      message: "comment submitted error",
    });
  }
  return NextResponse.json({
    success: true,
    message: "Comment submitted successfully",
  });
};
