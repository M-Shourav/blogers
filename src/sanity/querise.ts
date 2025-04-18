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

export const GET_POSTS_QUERY =
  defineQuery(`*[_type=='post'] | order(publishedAt desc)[0...$quantity]{
  title,
  'slug':slug.current,
  publishedAt,
  mainImage,
  excerpt,
  author->{
      name, image
  }
}`);

export const getAllPosts = async (quantity: number) => {
  return await clientFetch({
    query: GET_POSTS_QUERY,
    params: { quantity },
  });
};

export const CATEGORIES_QUERY =
  defineQuery(`*[_type=="category"]|order(title asc){
  title,
  'slug':slug.current
}`);

export const getAllCategories = async () => {
  return await clientFetch({
    query: CATEGORIES_QUERY,
  });
};
