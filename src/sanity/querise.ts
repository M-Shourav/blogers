import { defineQuery } from "next-sanity";

const FEATURED_POST_QUERY =
  defineQuery(`*[_type=="post" && isFeatured==true] | order (publishedAt desc)[0,$quantity]{\
title,
"slug":slug.current,
publishedAt,
mainImage,
excerpt,
author->{
    name,
    image
}
}`);
