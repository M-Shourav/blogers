import Categories from "@/component/categories";
import Container from "@/component/container";
import { urlFor } from "@/sanity/lib/image";
import { getCategoryPost } from "@/sanity/querise";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import { RiFileCloseLine } from "react-icons/ri";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getCategoryPost(slug);
  return (
    <div>
      <Container className="py-10 flex flex-col md:flex-row items-start md:justify-center gap-10">
        <Categories currentCategory={slug} />
        <div className="flex-1">
          {post?.length > 0 ? (
            <div className="mt-2">
              <h2 className="font-medium text-lg">
                All post by{" "}
                <span className="underline underline-offset-2 font-semibold capitalize decoration-[1px]">
                  {slug}
                </span>{" "}
                Category
              </h2>
              {post?.map((post) => (
                <div
                  key={post?.slug}
                  className=" relative grid grid-cols-1 border-b border-b-gray-100 
                           py-10 first:border-t first:border-gray-200 max-sm:gap-3 sm:grid-cols-3"
                >
                  <div>
                    <p className="text-sm/5 max-sm:text-gray-700 md:font-medium mb-2">
                      {dayjs(post?.publishedAt).format("dddd, MMMM D, YYYY")}
                    </p>
                    {post?.author && (
                      <div className="flex items-center gap-3">
                        {post?.author?.image && (
                          <Image
                            src={urlFor(post?.author.image).url()}
                            alt="authorImage"
                            width={80}
                            height={80}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <p className="text-sm/5 max-sm:text-gray-400 font-medium">
                          {post?.author?.name}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="sm:col-span-2 sm:max-w-2xl flex flex-col gap-y-3">
                    <h2 className="text-base font-semibold max-sm:text-gray-700">
                      {post?.title}
                    </h2>
                    <h3 className="text-sm/5 text-gray-500">{post?.excerpt}</h3>
                    <Link
                      href={`/post/${post?.slug}`}
                      className="flex items-center gap-1 text-base/5 font-semibold"
                    >
                      {/* <span className=" absolute inset-0" /> */}
                      Read more
                      <FaChevronRight className="size-4 fill-gray-600" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-y-4">
              <RiFileCloseLine className="w-24 h-24" />
              <h2 className="text-2xl/6 font-semibold text-gray-950">
                No posts found
              </h2>
              <p className="text-base tracking-wide font-medium">
                It seems there are no post available for{" "}
                <strong className=" capitalize underline underline-offset-1">
                  {slug}
                </strong>{" "}
                category
              </p>
              <Link
                href={"/"}
                className="w-fit bg-black text-white rounded-full px-3 py-2 border border-gray-300 shadow-md
              hover:bg-white hover:text-black duration-300 font-semibold"
              >
                Back to Home{" "}
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
