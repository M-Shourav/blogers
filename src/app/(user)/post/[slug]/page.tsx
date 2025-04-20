import Container from "@/component/container";
import { urlFor } from "@/sanity/lib/image";
import { getSinglePost } from "@/sanity/querise";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = (await getSinglePost(slug)) || notFound();
  return (
    <div className=" overflow-hidden">
      <Container className="mt-16">
        <p className="font-mono text-sm/5 text-gray-500 font-semibold tracking-widest uppercase">
          {dayjs(post?.publishedAt).format("dddd,MMMM D, YYYY")}
        </p>
        <h1 className="mt-2 text-2xl sm:text-6xl text-pretty font-medium tracking-tighter">
          {post?.title}
        </h1>
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem] ">
          <div className="flex flex-wrap items-center gap-5 max-lg:justify-between lg:flex-col lg:items-start">
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
            {post?.categories?.map((item) => (
              <div key={item?.slug} className="flex flex-wrap gap-2">
                <Link
                  href={`/category/${item?.slug}`}
                  className="rounded-full bg-gray-50 border border-gray-300 
                  border-dotted text-sm/6 text-gray-500 px-3 py-1 font-medium hover:text-black duration-300"
                >
                  {item?.title}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="text-gray-700">
              <div className="max-w-2xl xl:mx-auto">
                {post?.mainImage && (
                  <Image
                    src={urlFor(post?.mainImage).url()}
                    alt="postImage"
                    width={800}
                    height={800}
                    className="mb-10 aspect-[3/2] shadow-xl rounded-2xl object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
