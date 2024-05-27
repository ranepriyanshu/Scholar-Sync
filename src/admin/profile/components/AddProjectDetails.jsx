import React, { useState } from "react";
import { addProject } from "../../../../constants/api";

const AddProjectDetails = ({ onClose }) => {
  const [details, setDetails] = useState({
    projectTitle: "",
    description: "",
    projectLink: "",
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(addProject, {
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
        console.log("response was not Ok");
        // onSave(data);
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
    // onSave(details);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-auto rounded-lg bg-white p-6 sm:w-[800px]">
        <h2 className="mb-4 text-lg font-semibold">Add New Project Details</h2>

        {/* Form fields */}
        <div className="mb-4">
          <label
            htmlFor="projectTitle"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Project Title:
          </label>
          <input
            type="text"
            name="projectTitle"
            id="projectTitle"
            value={details.projectTitle}
            onChange={handleChange}
            className="w-full rounded border px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Description:
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={details.description}
            onChange={handleChange}
            className="w-full rounded border px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="projectLink"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Project Link:
          </label>
          <input
            type="text"
            name="projectLink"
            id="projectLink"
            value={details.projectLink}
            onChange={handleChange}
            className="w-full rounded border px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="skills"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Skills Used:
          </label>
          <input
            type="text"
            name="skills"
            id="skills"
            value={details.skills}
            onChange={handleChange}
            className="w-full rounded border px-4 py-2"
          />
        </div>

        {/* Buttons */}
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
      </div>
    </div>
  );
};

export default AddProjectDetails;
