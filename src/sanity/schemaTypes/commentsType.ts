import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const commentsType = defineType({
  name: "comment",
  type: "document",
  title: "Comment",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      title: "Approved",
      name: "approved",
      type: "boolean",
      description: "comments won't show on the site without approved",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "comment",
      type: "text",
    }),
    defineField({
      name: "post",
      type: "reference",
      to: [{ type: "post" }],
    }),
    defineField({
      name: "imageUrl",
      type: "string",
      title: "User Image link",
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      email: "email",
      approved: "approved",
      media: "image",
    },
    prepare({ title, email, approved, media }) {
      return {
        title,
        subtitle: `${approved ? "approved" : "In Review"} | User: ${email}`,
        media: media ? media : CommentIcon,
      };
    },
  },
});
