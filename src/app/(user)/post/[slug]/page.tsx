import Container from "@/component/container";
import OtherPost from "@/component/otherPost";
import { urlFor } from "@/sanity/lib/image";
import { getOtherPosts, getSinglePost } from "@/sanity/querise";
import dayjs from "dayjs";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { FaChevronLeft } from "react-icons/fa6";

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = (await getSinglePost(slug)) || notFound();
  const othersPosts = await getOtherPosts(slug, 3);
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
                {post?.body && (
                  <PortableText
                    value={post?.body}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="my-2 text-base/6 first:mt-0 last:mb-0">
                            {children}
                          </p>
                        ),
                        h2: ({ children }) => (
                          <h2
                            className="my-5 text-2xl/8 font-medium text-gray-950 
                           tracking-tight first:mt-0 last:mb-0"
                          >
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3
                            className="my-5 text-xl/8 font-medium tracking-tight text-gray-950
                          first:mt-0 last:mb-0"
                          >
                            {children}
                          </h3>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote
                            className="my-2.5 border-l-2 border-l-gray-300 pl-6 text-base/8 
                          text-gray-950 first:mt-0 last:mb-0"
                          >
                            {children}
                          </blockquote>
                        ),
                      },
                      types: {
                        image: ({ value }) => (
                          <Image
                            src={urlFor(value).url()}
                            alt={value.alt || ""}
                            className="w-full rounded-2xl"
                            width={1400}
                            height={1000}
                          />
                        ),
                        separator: ({ value }) => {
                          switch (value.style) {
                            case "line":
                              return (
                                <hr className="my-8 border-t border-gray-200" />
                              );
                            case "space":
                              return <div className="my-8" />;
                            default:
                              return null;
                          }
                        },
                      },
                      list: {
                        bullet: ({ children }) => (
                          <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">
                            {children}
                          </ul>
                        ),
                        number: ({ children }) => (
                          <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
                            {children}
                          </ol>
                        ),
                      },
                      listItem: {
                        bullet: ({ children }) => {
                          return (
                            <li className="my-2 pl-2 has-[br]:mb-8">
                              {children}
                            </li>
                          );
                        },
                        number: ({ children }) => {
                          return (
                            <li className="my-2 pl-2 has-[br]:mb-8">
                              {children}
                            </li>
                          );
                        },
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-semibold text-gray-950">
                            {children}
                          </strong>
                        ),
                        code: ({ children }) => (
                          <>
                            <span aria-hidden>`</span>
                            <code className="text-[15px]/8 font-semibold text-gray-950">
                              {children}
                            </code>
                            <span aria-hidden>`</span>
                          </>
                        ),
                        link: ({ value, children }) => {
                          return (
                            <Link
                              href={value.href}
                              className="font-medium text-gray-950 underline decoration-gray-400 underline-offset-4 data-[hover]:decoration-gray-600"
                            >
                              {children}
                            </Link>
                          );
                        },
                      },
                    }}
                  />
                )}
                <div className="mt-10">
                  <Link
                    className="w-fit flex items-center gap-x-1 border border-gray-500 rounded-full
                     shadow-2xl px-3 py-1 font-medium hover:bg-black hover:text-white duration-300 ease-in-out"
                    href={"/"}
                  >
                    <FaChevronLeft className="size-4" />
                    Back to Blog
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-10">comments</div>
          </div>
        </div>
      </Container>
      <OtherPost othersPosts={othersPosts} />
    </div>
  );
}
