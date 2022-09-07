import React from "react";

export const Image = ({ src, alt }) => {
  return (
    <>
      <img
        className="object-cover h-full w-screen rounded-2xl py-2.5 hover:scale-110  transform transition duration-500 "
        src={src}
        alt={alt}
      />
    </>
  );
};
