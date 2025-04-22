import Categories from "@/component/categories";
import Container from "@/component/container";
import { getCategoryPost } from "@/sanity/querise";
import Link from "next/link";
import React from "react";
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
      <Container className="py-10 flex flex-wrap items-center sm:items-start justify-center  gap-10">
        <Categories currentCategory={slug} />
        <div>
          {post?.length > 0 ? (
            <div>post</div>
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
