import { createClient, type QueryParams } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export const clientFetch = <const QueryString extends string>({
  query,
  params = {},
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  tags?: string[];
}) => {
  return client.fetch(query, params, {
    next: {
      tags,
    },
  });
};
