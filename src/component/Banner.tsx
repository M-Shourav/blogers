import React from "react";

export default function Banner() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center mb-10">
      <h3 className="font-semibold">My blog</h3>
      <h2 className="text-3xl lg:text-5xl font-bold tracking-wide">
        Writings from our team{" "}
      </h2>
      <p className="tracking-wide">
        The latest industry news, interviews, technologies, and resources.
      </p>
    </div>
  );
}
