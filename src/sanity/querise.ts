import { defineQuery } from "next-sanity";
import { clientFetch } from "./lib/client";

const FEATURED_POSTS_QUERY =
  defineQuery(`*[_type=='post' && isFeatured==true] | order(publishedAt desc)[0...$quantity]{
    title,
    'slug':slug.current,
    publishedAt,
    mainImage,
    excerpt,
    author->{
        name, image
    }
}`);

export const getFeaturedPosts = async (quantity: number) => {
  return await clientFetch({
    query: FEATURED_POSTS_QUERY,
    params: { quantity },
  });
};
