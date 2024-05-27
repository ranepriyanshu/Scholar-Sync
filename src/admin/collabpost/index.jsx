import React from "react";
import Form from "./components/Form";
import PreviousPost from "./components/PreviousPosts";

const ResearchForm = () => {
  return (
    <div className="grid grid-cols-3">
      <div className="grid-cols col-span-2 my-2 mx-auto w-8/12 rounded-3xl bg-gray-200 p-6 shadow-md dark:bg-navy-800  dark:text-white">
        <Form />
      </div>
      <div className="mx-auto">
        <PreviousPost />
      </div>
    </div>
  );
};

export default ResearchForm;
