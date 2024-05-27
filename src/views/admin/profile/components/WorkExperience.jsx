import React, { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import AddWorkExperience from "./AddWorkExperience";

const WorkExperience = ({ logoUrl, title, description, allowEdit, data }) => {
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
        <div className="text-black flex items-center justify-between rounded-t-lg p-4">
          <div className="flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <IoDocumentTextOutline size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-sm">{description}</p>
            </div>
          </div>
          <div>
            <button
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:bg-blue-100 focus:outline-none"
              onClick={togglePopup}
            >
              Add New
            </button>
          </div>
        </div>
      )}
      <div className="p-4">
        {detailsList.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No details added yet.</p>
        ) : (
          <ul>
            {detailsList.map((details, index) => (
              <div
                key={index}
                className="relative mb-6 rounded-lg bg-gray-100 p-4"
                style={{ minHeight: "120px" }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <p className="font-semibold">
                      Company Name: {details.companyName}
                    </p>
                    <p className="font-semibold">
                      Certificate Link: {details.certificateLink}
                    </p>
                    <p className="font-semibold">
                      Start Date: {details.startDate}
                    </p>
                    <p className="font-semibold">End Date: {details.endDate}</p>
                  </div>
                </div>
                <button
                  className="absolute bottom-4 right-4 text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => handleDeleteDetail(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
      {showPopup && <AddWorkExperience onClose={togglePopup} />}
    </div>
  );
};

export default WorkExperience;
