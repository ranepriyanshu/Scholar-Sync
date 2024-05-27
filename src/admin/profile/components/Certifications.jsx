import React, { useState } from "react";
import { AddCertificateDetails } from "./export";
import { IoDocumentTextOutline } from "react-icons/io5";

const Card = ({ logoUrl, title, description, allowEdit, data }) => {
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
          <div className="mr-4 h-12 w-12 justify-center overflow-hidden rounded-full bg-gray-100 align-middle">
            <IoDocumentTextOutline size={32} className="m-2" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <div className="ml-auto">
            <button
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
              onClick={togglePopup}
            >
              Add New
            </button>
          </div>
        </div>
      )}
      <div className="p-4">
        {detailsList.length === 0 ? (
          <p className="text-center text-gray-500">No details added yet.</p>
        ) : (
          <ul>
            {detailsList.map((details, index) => (
              <div
                key={index}
                className="relative mb-4 rounded-lg bg-gray-100 p-4"
              >
                <button
                  className="absolute bottom-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => handleDeleteDetail(index)}
                >
                  Delete
                </button>
                <p className="font-semibold">
                  Certificate Title: {details.title}
                </p>
                <p className="font-semibold">
                  Description: {details.description}
                </p>
                <p className="font-semibold">
                  Certificate Link: {details.certificateLink}
                </p>
              </div>
            ))}
          </ul>
        )}
      </div>
      {showPopup && <AddCertificateDetails onClose={togglePopup} />}
    </div>
  );
};

export default Card;
