"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

interface FormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

export default function WriteComments({ _id }: { _id: string }) {
  const { data: session } = useSession();
  const [submited, setSubmited] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const userImage = session?.user?.image || "";
    try {
      fetch("/api/create-comment", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          ImageURL: userImage,
        }),
      });
    } catch (error) {
      console.log("Create comment error", error);
    } finally {
      setSubmited(true);
    }
  };
  return (
    <>
      {submited ? (
        <div className="flex items-center justify-center p-5">
          <div
            className="w-full max-w-2xl px-6 py-16 shadow-xl rounded-lg
           bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white"
          >
            <div className="flex flex-col items-center space-y-2">
              <FaRegCheckCircle className="w-16 h-16 text-white" />
              <h1 className="text-2xl font-semibold">
                Thank you for submitting your comment
              </h1>
              <p className="text-lg">
                Once It has been approved by our admin, it will appear below
              </p>
              <div className="mt-6 text-sm text-gray-300">
                we appreciate your patience and value your contribution
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-2xl mx-auto gap-y-5"
        >
          <h3 className="text-base/6 font-bold text-blue-600">
            Enjoyed this article?
          </h3>
          <h1 className="text-3xl font-bold">Leave a Comment below!</h1>
          <hr className="py-4 mt-2" />
          <input {...register("_id")} type="hidden" name="_id" value={_id} />
          <div className="flex flex-col gap-y-2">
            <label className="text-base font-semibold">Name</label>
            <input
              disabled={!session?.user}
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 outline-none border rounded-md
              text-gray-700 bg-white focus:border-blue-600"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-base font-semibold">Email</label>
            <input
              disabled={!session?.user}
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 outline-none border rounded-md
              text-gray-700 bg-white focus:border-blue-600"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-base font-semibold">Comment</label>
            <textarea
              disabled={!session?.user}
              {...register("comment", { required: true })}
              placeholder="Type your comments here "
              className="w-full px-4 py-2 outline-none border rounded-md
              text-gray-700 bg-white focus:border-blue-600 resize-none"
              rows={5}
            />
          </div>
          {errors && (
            <div className="flex flex-col mb-3">
              {errors?.name && (
                <span className="text-red-500">
                  - The name Field is required
                </span>
              )}
              {errors?.email && (
                <span className="text-red-500">
                  - The email Field is required
                </span>
              )}
              {errors?.comment && (
                <span className="text-red-500">
                  - The comment Field is required
                </span>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={!session?.user}
            className="w-full py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
           text-white rounded-md transition-all duration-300 hover:from-blue-700 hover:to-pink-700
           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg font-semibold
           cursor-pointer"
          >
            Submit
          </button>
          {!session?.user && (
            <div className="flex items-center gap-2 mt-2">
              <p>Please login to write a comment</p>
              <Link
                href={"/login"}
                className="text-lg font-semibold underline underline-offset-2 decoration-[1px]"
              >
                Login
              </Link>
            </div>
          )}
        </form>
      )}
    </>
  );
}
