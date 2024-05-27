import React, { useState } from "react";
import { format, differenceInWeeks } from "date-fns";
import { FaRegBookmark } from "react-icons/fa";
import { userAppliedOnJob } from "../../../../constants/api";

const CollabPost = ({ data }) => {
  const userID = data?._id;
  const [applied, setApplied] = useState(false);
  const {
    titleOfJob,
    typeOfJob,
    stipend,
    durationInMonths,
    lastDate,
    domain,
    createdAt,
    moreAboutJob,
    user,
  } = data;

  const fullName = user?.fullName;
  const collegeName = user?.collegeName;

  // Function to open PDF file in a new window
  const openPDF = () => {
    window.open(moreAboutJob, "_blank");
  };

  // Function to handle "Apply Now" button click
  const handleApplyNow = async () => {
    setApplied(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(userAppliedOnJob + userID, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.log("response was not ok");
      }
    } catch (error) {
      throw new error("There was a problem with connecting to the server");
    }
  };

  // Format createdAt to display weeks ago
  const createdAtWeeksAgo = differenceInWeeks(new Date(), new Date(createdAt));
  const formattedCreatedAt =
    createdAtWeeksAgo === 0 ? "This week" : `${createdAtWeeksAgo} weeks ago`;

  // Format lastDate to display in yyyy-MM-dd format
  const formattedLastDate = format(new Date(lastDate), "yyyy-MM-dd");

  return (
    <div className="border-top border-r-1 mb-8 rounded-lg border-t-2 border-l-2 border-solid border-white border-opacity-40 bg-white p-6 shadow-md  backdrop-filter dark:bg-white dark:bg-opacity-5 dark:text-gray-200">
      {/* Top section */}
      <div className="mb-4">
        {/* Research Area and Save icon */}
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold dark:text-gray-100">
            {titleOfJob}
          </h2>
          <div className="cursor-pointer text-gray-500 hover:text-blue-500">
            <FaRegBookmark size={24} />
          </div>
        </div>
        {/* Professor Name and College Name */}
        <div className="flex">
          <p className="mr-2 text-sm text-gray-600 dark:text-gray-400">
            {fullName}
          </p>
          <span className="text-sm text-gray-500">|</span>
          <p className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {/* {console.log(collegeName)} */}
            {collegeName}
          </p>
        </div>
      </div>
      {/* Topics */}
      <div className="mb-4">
        <div className="flex flex-wrap">
          {domain.map((topic, index) => (
            <div
              key={index}
              className="mr-2 mb-2 rounded-lg bg-gray-200 py-1 px-2 text-sm text-gray-800 dark:bg-gray-600 dark:bg-opacity-20 dark:text-gray-100"
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
      {/* Remote, Stipend, Duration */}
      <div className="mb-4 flex justify-between">
        <div className="flex flex-col">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Remote/OnSite
          </p>
          <p className="text-center text-xl text-gray-800 dark:text-gray-300">
            {typeOfJob}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Stipend
          </p>
          <p className="text-center text-xl text-gray-800 dark:text-gray-300">
            <span>&#8377; </span>
            {stipend}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Duration
          </p>
          <p className="text-center text-xl text-gray-800 dark:text-gray-300">
            {durationInMonths} months
          </p>
        </div>
      </div>
      {/* lastDate, ApplyBy, ApplyNow */}
      <div className="flex items-center justify-between">
        <div className="flex">
          <p className="mx-2 text-sm text-gray-600 dark:text-gray-100">
            Posted {formattedCreatedAt}
          </p>
          <p>&bull;</p>
          <p className="mx-2 text-sm text-gray-800 dark:text-gray-100">
            Apply by {formattedLastDate}
          </p>
        </div>
        <div>
          <button
            className="mr-4 rounded-md bg-blue-500 py-2 px-6 text-white hover:bg-blue-700 dark:bg-teal-400 dark:text-white dark:hover:bg-teal-300 dark:active:bg-teal-200"
            onClick={openPDF}
          >
            View Details
          </button>
          <button
            className={`mr-4 rounded-md bg-blue-500 py-2 px-6 text-white hover:bg-blue-700 dark:bg-purple-700 dark:text-white dark:hover:bg-purple-500 dark:active:bg-purple-300
            ${applied ? "cursor-not-allowed bg-gray-400" : ""}`}
            onClick={!applied ? handleApplyNow : null}
            disabled={applied}
          >
            {applied ? "Applied" : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollabPost;
