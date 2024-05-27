import React from "react";

const Card = ({ aim, imgURL, text }) => {
  return (
    <div className="m-8 flex flex-col items-center justify-center rounded-2xl bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:col-span-1">
      <h3 className="mb-2 text-xl font-bold">{aim}</h3>
      <img
        src={imgURL}
        alt={aim}
        className="mb-2 h-64 w-64 rounded-3xl object-cover"
      />
      <p className="text-center text-gray-600">{text}</p>
    </div>
  );
};

export default Card;
