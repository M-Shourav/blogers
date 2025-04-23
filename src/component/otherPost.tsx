import React from "react";
import Container from "./container";
import { GET_OTHER_POST_QUERYResult } from "@/sanity/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import dayjs from "dayjs";

export default async function OtherPost({
  othersPosts,
}: {
  othersPosts: GET_OTHER_POST_QUERYResult;
}) {
  console.log(othersPosts);

  return (
    <Container className="mb-10">
      <p className="text-xl font-semibold mb-5">You may also like</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {othersPosts?.map((post, index) => (
          <div key={index} className="group relative">
            <div className=" overflow-hidden rounded-tr-2xl rounded-tl-2xl">
              {post?.mainImage && (
                <Image
                  src={urlFor(post?.mainImage).url()}
                  alt="mainImage"
                  width={500}
                  height={500}
                  className=" aspect-[3/2] w-full object-cover
                   shadow-xl group-hover:scale-105 duration-300"
                />
              )}
            </div>
            <div className="p-5 bg-gray-100 rounded-br-2xl rounded-bl-2xl">
              {post?.slug && (
                <div>
                  <Link
                    href={`/post/${post?.slug.current}`}
                    className="font-semibold text-base"
                  >
                    <span className=" absolute inset-0" />
                    {post?.title}
                  </Link>
                </div>
              )}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                {post?.author?.image && (
                  <div className="flex items-center gap-3">
                    <Image
                      src={urlFor(post?.author.image).url()}
                      alt="author-image"
                      width={50}
                      height={50}
                      className="aspect-square size-6 rounded-full object-center"
                    />
                    <h2 className="text-gray-700 text-sm/5">
                      {post?.author?.name}
                    </h2>
                  </div>
                )}
                <p className="font-mono text-sm/5 max-sm:text-gray-700 md:font-medium mb-2">
                  {dayjs(post?.publishedAt).format("dddd, MMMM D, YYYY")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
