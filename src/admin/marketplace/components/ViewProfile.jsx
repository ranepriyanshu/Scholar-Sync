import React, { useEffect, useState } from "react";
import { viewProfile } from "../../../../constants/api";

const ProfileComponent = ({ id, name }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [data, setData] = useState(null); // Initialize data as null instead of "data"
  const tabs = [
    {
      id: "profile",
      name: "Profile",
      content: <ProfileDetails data={data} />, // Pass data to ProfileDetails
    },
    {
      id: "experience",
      name: "Experience",
      content: <Experience data={data} />, // Pass data to Experience
    },
    {
      id: "projects",
      name: "Research/Projects",
      content: <ProjectDetails data={data} />, // Pass data to ProjectDetails
    },
  ];

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${viewProfile}${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("profileView Data", data);
      setData(data);
      // console.log("data", data);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="col-span-1 flex h-full  flex-col items-center overflow-y-auto xl:col-span-1 2xl:col-span-2">
      {/* Upper Part */}
      <div className=" flex  w-full items-center  justify-between p-4 md:w-2/3">
        <div className="flex items-center">
          <img
            src="https://i.ibb.co/zr5Mdn9/premium-photo-1670282393309-70fd7f8eb1ef-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg"
            alt="Avatar"
            className="mr-4 h-16 w-16 rounded-full"
          />
          <div className="ml-5">
            {/* <p className="text-lg font-semibold">{name}</p> */}
            <p className="text-sm text-gray-600">
              {data?.message?.education[0]?.university}
            </p>
          </div>
        </div>
        {/* Additional content can be added here on the right side */}
      </div>

      {/* Lower Part */}
      <div className="w-full p-4 md:w-2/3 ">
        <div className="mb-4 flex justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`mt-8 rounded-md px-4 py-2 ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Render the selected tab's content */}
        <div className=" rounded-md  p-4">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>
    </div>
  );
};

const ProfileDetails = ({ data }) => {
  // console.log("user profile data", data);
  return (
    <div>
      <p className="mb-2 text-lg font-semibold">Profile Details</p>
      {data && (
        <div className="rounded-md bg-white p-4 shadow-md">
          <p className="mb-2">
            <span className="font-semibold">Department:</span>
            {data?.message?.education[0]?.fieldOfStudy}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Domain:</span>
            {data?.message?.domain.join(",")}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Skills:</span>
            {data?.message?.skills?.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

const Experience = ({ data }) => {
  return (
    <div>
      <p className="mb-2 text-lg font-semibold">Experience Details</p>
      {data && (
        <div className="rounded-md bg-white p-4 shadow-md">
          <p className="mb-2">
            <span className="font-semibold">Company Name:</span>{" "}
            {data?.message?.workExperience[0]?.companyName}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Certificate Link:</span>{" "}
            {data?.message?.workExperience[0]?.certificateLink}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Start Date:</span>{" "}
            {data?.message?.workExperience[0]?.startDate}
          </p>
          <p className="mb-2">
            <span className="font-semibold">End Date:</span>{" "}
            {data?.message?.workExperience[0]?.endDate}
          </p>
        </div>
      )}
    </div>
  );
};

const ProjectDetails = ({ data }) => {
  return (
    <div>
      <p className="mb-2 text-lg font-semibold">Project/ Details</p>
      {data && (
        <div className="rounded-md bg-white p-4 shadow-md">
          <p className="mb-2">
            <span className="font-semibold">Title:</span>{" "}
            {data?.message?.project[0]?.projectTitle}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Description:</span>{" "}
            {data?.message?.project[0]?.description}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Project Link:</span>{" "}
            {data?.message?.project[0]?.projectLink}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Skills:</span>{" "}
            {data?.message?.project[0]?.skills?.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
