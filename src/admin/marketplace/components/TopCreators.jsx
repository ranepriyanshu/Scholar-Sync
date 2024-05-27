import React, { useState, useEffect } from "react";
import Card from "components/card";
import { getUserOfSameCollege } from "../../../../constants/api";
import avatar4 from "../../../../assets/img/avatars/avatar4.png";

const TopCreators = ({ setLeftSide, setName }) => {
  const [APIdata, setData] = useState([]);
  useEffect(() => {
    handle();
  }, []);

  const handle = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(getUserOfSameCollege, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data = await response.json();
        console.log("data", data);
        setData(data.data);
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  // const handleSelectCreator = (id) => {
  //   // Update the leftSide state to render 'card' on the left side
  //   console.log(id)
  //   console.log("working")
  //   setLeftSide("card");
  // };

  return (
    <Card extra={"h-[auto] w-full"}>
      {/* Top Creator Header */}
      <div className="flex h-fit w-full items-center justify-between overflow-y-auto rounded-t-2xl bg-white px-4 pt-4 pb-[20px] shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
          {
            JSON.parse(localStorage.getItem("userData"))?.data?.User
              ?.collegeName
          }
        </h4>
        <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          Select
        </button>
      </div>

      {/* List of Creators */}
      <div>
        {APIdata.map((data, index) => (
          <div
            key={index}
            className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700"
          >
            {/* Image, Name, and Department */}
            <div className="flex items-center">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
                <img
                  className="h-full w-full object-cover"
                  src={data.profilePicture ? data.profilePicture : avatar4}
                  alt=""
                />
              </div>
              <div className="ml-4 flex-shrink-0">
                <h4 className="flex flex-wrap text-base font-bold text-navy-700 dark:text-white">
                  {data.fullName}
                </h4>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {data.role.toUpperCase()}
                </p>
              </div>
            </div>
            {/* View Profile Button */}
            <div>
              <button
                // onClick={() => console.log("View profile clicked")} // Add logic to view profile
                className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
                onClick={() => {
                  // Update the leftSide state to render 'card' on the left side
                  console.log(data._id);
                  // console.log("working and sent left is",data._id);
                  setLeftSide(data._id);
                  setName(data.fullName);
                }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TopCreators;
