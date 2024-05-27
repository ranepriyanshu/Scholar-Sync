import React, { useState } from "react";
import { addEducation } from "../../../../constants/api";

const AddEducationDetails = ({ onClose }) => {
  const [details, setDetails] = useState({
    university: "",
    degree: "",
    grade: "",
    fieldOfStudy: "",
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
      const response = await fetch(addEducation, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(details),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data = await response.json();
        console.log(data);
        // onSave(data);
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
    // onSave(details);
    onClose();
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-auto rounded-lg bg-white p-6 sm:w-[800px]">
        <h2 className="mb-4 text-lg font-semibold">
          Add New Education Details
        </h2>
        <form>
          <div className="grid grid-cols-2 gap-6">
            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="university"
              >
                University:
              </label>
              <input
                type="text"
                name="university"
                id="university"
                className="w-full rounded border px-4 py-2"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="degree"
              >
                Degree:
              </label>
              <input
                type="text"
                name="degree"
                id="degree"
                className="w-full rounded border px-4 py-2"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="fieldOfStudy"
              >
                Field of Study:
              </label>
              <input
                type="text"
                name="fieldOfStudy"
                id="fieldOfStudy"
                className="w-full rounded border px-4 py-2"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="grade"
              >
                Grade:
              </label>
              <input
                type="text"
                name="grade"
                id="grade"
                className="w-full rounded border px-4 py-2"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="startDate"
              >
                Start Date:
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="w-full rounded border px-4 py-2"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="endDate"
              >
                End Date:
              </label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="w-full rounded border px-4 py-2"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
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

export default AddEducationDetails;
