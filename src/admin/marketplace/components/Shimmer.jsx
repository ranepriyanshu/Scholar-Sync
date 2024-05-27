import React from "react";

const ShimmerCard = () => {
  return (
    <div className="animate-pulse rounded-lg bg-white p-6 shadow-md backdrop-filter dark:bg-white dark:bg-opacity-5 dark:text-gray-200">
      <div className="mb-4 h-36 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
      <div className="mb-2 h-4 w-24 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
      <div className="h-4 w-20 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
    </div>
  );
};

export default ShimmerCard;
