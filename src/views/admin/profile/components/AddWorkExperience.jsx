import React, { useState } from "react";
import { addWorkExperience } from "../../../../constants/api";

const AddWorkExperience = ({ onClose, onSave }) => {
  const [details, setDetails] = useState({
    companyName: "",
    certificateLink: "", // corrected field name
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(addWorkExperience, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(details), // Send the details object as JSON string in the request body
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        // Assuming the API returns a JSON response with the newly added work experience details
        const data = await response.json();
        console.log(data);
        // Pass the data to the onSave callback
        // onSave(data);
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
    // onSave(details); // This line seems redundant, but I'll keep it as it is in your original code
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-800 bg-opacity-50">
      <div className="w-auto rounded-lg bg-white p-6 sm:w-[800px]">
        <h2 className="mb-4 text-lg font-semibold">Add New Work Experience</h2>
        <form>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="companyName"
            >
              Company Name:
            </label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              className="w-full rounded border px-4 py-2"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="certificateLink"
            >
              Certificate Link
            </label>
            <input
              type="text"
              name="certificateLink"
              id="certificateLink"
              className="w-full rounded border px-4 py-2"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="startDate"
            >
              Start Date:
            </label>
            <input
              type="date" // changed to type date
              name="startDate"
              id="startDate"
              className="w-full rounded border px-4 py-2"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="endDate"
            >
              End Date:
            </label>
            <input
              type="date" // changed to type date
              name="endDate"
              id="endDate"
              className="w-full rounded border px-4 py-2"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkExperience;
