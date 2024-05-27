import React, { useState } from "react";
import axios from "axios";
import { TopicNames } from "../../../../constants/collabPostData";
import { uploadOpenings } from "../../../../constants/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const userData = localStorage.getItem("userData");

  // State variables
  const [researchName, setResearchName] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [newTopic, setNewTopic] = useState([]);
  const [role, setRole] = useState("");
  const [stipend, setStipend] = useState("");
  const [duration, setDuration] = useState("");
  const [applyBy, setApplyBy] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [showTopicFilter, setShowTopicFilter] = useState(false);

  // API Call
  const handleSubmitAPI = async () => {
    // e.preventDefault();
    const data = {
      titleOfJob: researchName,
      professor: JSON.parse(userData)?.data?.User?.fullName,
      institute: JSON.parse(userData)?.data?.User?.collegeName,
      domain: selectedTopics,
      isRemote: role === "remote",
      isOnSite: role === "onsite",
      stipend: stipend,
      durationInMonths: duration,
      lastDate: applyBy,
      detailsLink: fileLink,
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(uploadOpenings, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.statusText !== "OK") {
        throw new Error("Network response was not ok");
      } else {
        return true;
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      return false;
    }
  };

  const handleTopicInputChange = (event) => {
    setNewTopic(event.target.value);
    setShowTopicFilter(event.target.value.trim() !== "");
  };

  const handleTopicAdd = (topic) => {
    if (topic && !selectedTopics.includes(topic) && selectedTopics.length < 6) {
      setSelectedTopics([...selectedTopics, topic]);
      setNewTopic([]);
      setShowTopicFilter(false);
    }
  };

  const handleTopicRemove = (topic) => {
    setSelectedTopics(selectedTopics.filter((t) => t !== topic));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !researchName ||
      selectedTopics.length === 0 ||
      !stipend ||
      !duration ||
      !applyBy ||
      !fileLink
    ) {
      toast.error("Please enter all required details.");
    } else {
      const success = await handleSubmitAPI();
      if (success) {
        toast.success("Your collab post has been created successfully.");
        setResearchName("");
        setSelectedTopics([]);
        setNewTopic([]);
        setRole("");
        setStipend("");
        setDuration("");
        setApplyBy("");
        setFileLink("");
        setShowTopicFilter(false);
      } else {
        toast.error("Failed to create collab post. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-6 text-center text-2xl font-semibold">
        Enter details for your Post
      </h2>

      {/* Professor Name */}
      <div className="mb-4">
        <label className="mb-2 block">
          Your Name <span className="text-red-500">*</span>
        </label>
        <div className="text-bold block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-navy-500 dark:bg-gray-300">
          {JSON.parse(userData)?.data?.User?.fullName}
        </div>
      </div>

      {/* Institute Name */}
      <div className="mb-4">
        <label className="mb-2 block">
          Institute Name <span className="text-red-500">*</span>
        </label>
        <div className="text-bold block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-navy-500 dark:bg-gray-300">
          {JSON.parse(userData)?.data?.User?.collegeName}
        </div>
      </div>

      {/* Research Title */}
      <div className="mb-4">
        <label className="mb-2 block">
          Research Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={researchName}
          onChange={(e) => setResearchName(e.target.value)}
          className="text-bold block w-full rounded-md border-gray-300 px-3 py-2 text-navy-500 dark:bg-gray-300"
        />
      </div>

      {/* Topics Section  */}
      <div className="mb-4">
        <label className="mb-2 block">
          Topics <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={newTopic}
          onChange={handleTopicInputChange}
          className="text-bold block w-full rounded-md border-gray-300 px-3 py-2 text-navy-500 dark:bg-gray-300"
          placeholder="Start typing to filter topics (at max 6) "
        />

        {/* conditional rendering */}
        {showTopicFilter && (
          <div className="mt-2">
            {TopicNames.filter((topic) =>
              topic.toLowerCase().includes(newTopic.toLowerCase())
            ).map((filteredTopic, index) => (
              <button
                key={index}
                className="m-1 rounded-md bg-gray-200 px-3 py-1 text-gray-800 focus:outline-none "
                onClick={() => handleTopicAdd(filteredTopic)}
              >
                {filteredTopic}
              </button>
            ))}
          </div>
        )}
        {/* Showing Selected topics */}
        <div className="center mt-2 flex flex-wrap ">
          {selectedTopics.map((topic, index) => (
            <span
              key={index}
              className="text-slate-gray text-bold m-1 inline-block rounded-md bg-white px-3 py-2 text-base text-navy-500"
            >
              {topic}
              <button
                onClick={() => handleTopicRemove(topic)}
                className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                &#10005;
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Remote/Onsite */}
      <div className="m-4 flex items-center justify-between px-2 dark:text-white">
        {/* Student Radio Button */}
        <label htmlFor="remote">Remote</label>
        <input
          type="radio"
          id="remote"
          value="remote"
          name="role"
          onChange={handleRoleChange}
        />

        {/* onSite Radio Button */}
        <label htmlFor="onsite">onSite</label>
        <input
          type="radio"
          id="onSite"
          value="onSite"
          name="role"
          onChange={handleRoleChange}
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block">
          Stipend <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={stipend}
          onChange={(e) => setStipend(e.target.value)}
          placeholder="&#8377;"
          className="text-bold block w-full rounded-md border-gray-300 px-3 py-2 text-navy-500 dark:bg-gray-300"
        />
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="mb-2 block">
          Duration <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="in months"
          className="text-bold block w-full rounded-md border-gray-300 px-3 py-2 text-navy-500 dark:bg-gray-300"
        />
      </div>

      {/* Apply By */}
      <div className="mb-4">
        <label className="mb-2 block">
          Apply By <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={applyBy}
          onChange={(e) => setApplyBy(e.target.value)}
          className="text-bold block w-full rounded-md border-gray-300 px-3 py-2 text-navy-500 dark:bg-gray-300"
        />
      </div>

      {/* Details */}
      <div className="mb-4">
        <label className="mb-2 block">
          Details <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          // value={fileLink}
          onChange={(e) => {
            setFileLink(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
          className="text-bold block w-full rounded-md border-gray-300 px-3 py-2 text-navy-500 dark:bg-gray-300"
          placeholder="Enter drive link"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          type="submit"
        >
          Submit
        </button>
      </div>

      {/* Toast Properties */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeButton={false}
      />
    </form>
  );
};

export default Form;
