import React, { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import AddProjectDetails from "./AddProjectDetails";

const Project = ({ logoUrl, title, description, allowEdit, data }) => {
  const [detailsList, setDetailsList] = useState(data);
  const [showPopup, setShowPopup] = useState(false);

  const handleDeleteDetail = (index) => {
    const updatedDetails = [...detailsList];
    updatedDetails.splice(index, 1);
    setDetailsList(updatedDetails);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="mx-auto mt-10 overflow-hidden rounded-lg bg-white shadow-md">
      {allowEdit && (
        <div className="flex items-center p-4">
          {/* Document Logo */}
          <div className="mr-4 h-12 w-12 justify-center overflow-hidden rounded-full bg-gray-100 align-middle">
            <IoDocumentTextOutline size={32} className="m-2" />
          </div>
          {/* Document Title and Description */}
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          {/* Add New Button */}
          <div className="ml-auto">
            <button
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
              onClick={togglePopup}
            >
              Add New
            </button>
          </div>
        </div>
      )}
      {/* Render added details */}
      <div className="p-4 ">
        {detailsList.length === 0 ? (
          <p className="p-4 text-center text-gray-500">
            No project details added yet
          </p>
        ) : (
          <ul>
            {detailsList.map((details, index) => (
              <li key={index} className="mb-6 rounded-lg bg-gray-100 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold text-gray-600">
                      Project Title:
                    </span>{" "}
                    {details.projectTitle}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Description:
                    </span>{" "}
                    {details.description}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Project Link:
                    </span>{" "}
                    {details.projectLink}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Skills Used:
                    </span>{" "}
                    {details.skills}
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <button
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      onClick={() => handleDeleteDetail(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Render popup if showPopup is true */}
      {showPopup && <AddProjectDetails onClose={togglePopup} />}
    </div>
  );
};

export default Project;
