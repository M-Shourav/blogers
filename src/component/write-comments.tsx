"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

export default function WriteComments({ _id }: { _id: string }) {
  const { data: session } = useSession();
  const [submited, setSubmited] = useState(true);
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
        <div>forms</div>
      )}
    </>
  );
}
