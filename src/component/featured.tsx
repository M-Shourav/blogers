import React from "react";
import Container from "./container";
import { getFeaturedPosts } from "@/sanity/querise";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import dayjs from "dayjs";
import Link from "next/link";

export default async function Featured() {
  const featurePost = await getFeaturedPosts(3);
  if (featurePost?.length === 0) {
    return;
  }
  return (
    <div>
      <Container>
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-wide">
          My Featured Post
        </h2>
        <div className=" mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featurePost?.map((post) => (
            <div
              key={post?.slug}
              className="group  relative flex flex-col rounded-3xl p-2 bg-white shadow-md
              shadow-black/5 ring-1 ring-black/5"
            >
              <div className="overflow-hidden rounded-2xl">
                {post?.mainImage && (
                  <Image
                    src={urlFor(post?.mainImage).url()}
                    alt={post?.mainImage?.alt || ""}
                    width={800}
                    height={800}
                    className="aspect-[3/2] w-full object-cover rounded-2xl group-hover:scale-110 duration-500"
                  />
                )}
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-sm/5 text-gray-500">
                  {dayjs(post?.publishedAt).format("dddd, MMMM d, YYYY")}
                </h3>
                <div className="text-base/7 font-semibold">
                  <Link href={`/post/${post?.slug}`}>
                    <span className=" absolute inset-0" />
                    {post?.title}
                  </Link>
                </div>
                <p className="mt-2 flex-1 text-base/5 text-gray-500">
                  {post?.excerpt}
                </p>
                <div className="mt-6">
                  {post?.author && (
                    <div className="flex items-center gap-4">
                      {post?.author?.image && (
                        <Image
                          src={urlFor(post?.author.image).url()}
                          alt="authorImage"
                          width={80}
                          height={80}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <p className="text-base/7 font-semibold">
                        {post?.author?.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
