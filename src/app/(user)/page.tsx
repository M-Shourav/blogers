import Banner from "@/component/Banner";
import Categories from "@/component/categories";
import Container from "@/component/container";
import Featured from "@/component/featured";
import { urlFor } from "@/sanity/lib/image";
import { getAllPosts } from "@/sanity/querise";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

export default async function Home() {
  const post = await getAllPosts(4);

  return (
    <Container className="mb-40">
      <Banner />
      <Featured />
      <div className="mt-16 pb-24">
        <Categories />
        <div>
          {post?.length === 0 ? (
            <div>No Post</div>
          ) : (
            <div className="mt-6">
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
          )}
        </div>
      </div>
    </Container>
  );
}
