import React from "react";
import { Image } from "./Image";

export const Images = ({ data }) => {
  return (
    <div className="container gap-5 mx-auto my-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 sm:p-3 min-w-full rounded-2xl">
      {data.map((img, id) => {
        return (
          <div key={id} className="w-full h-full rounded ">
            <Image src={img.urls.small} alt="unsplash images"></Image>
          </div>
        );
      })}
    </div>
  );
};
