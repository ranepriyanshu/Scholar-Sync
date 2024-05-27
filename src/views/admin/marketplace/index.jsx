import React, { useState, useEffect } from "react";
import Banner from "./components/Banner";
import CollabPostCard from "./components/CollabPostCard";
import ShimmerCard from "./components/Shimmer";
import Profile2 from "./components/ViewProfile";
import TopCreators from "./components/TopCreators";
import HistoryCard from "./components/HistoryCard";
import { getAllJobPost, getJobsOfSameCollege } from "../../../constants/api";

const Marketplace = () => {
  const [APIdata1, setData1] = useState([]);
  const [APIdata2, setData2] = useState([]);
  const [isLoading1, setLoading1] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [leftSide, setLeftSide] = useState("left"); // Default to render 'left' side
  const [name, setName] = useState("");

  useEffect(() => {
    // console.log("recieved left id is" + leftSide);
  }, [leftSide, setLeftSide]);

  const RenderLeftSide = () => {
    if (leftSide !== "left") {
      return <Profile2 id={leftSide} name={name} />;
    } else
      return (
        <div className="col-span-1 h-full overflow-y-auto xl:col-span-1 2xl:col-span-2">
          {/* Your left side content goes here */}
          {/* This can include your Banner, CollabPostCard, etc. */}
          <Banner />
          <div className="flex-start mb-4 mt-5 flex justify-between px-4 md:flex-row md:items-center">
            <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
              Recent Openings
            </h4>
          </div>
          <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-1">
            {isLoading1 ? (
              <>
                <ShimmerCard />
                <ShimmerCard />
              </>
            ) : (
              APIdata1.map((data, index) => (
                <CollabPostCard key={index} data={data} />
              ))
            )}
          </div>
          <div className="flex-start mb-4 mt-5 flex justify-between px-4 md:flex-row md:items-center">
            <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
              Openings at{" "}
              {
                JSON.parse(localStorage.getItem("userData"))?.data?.User
                  ?.collegeName
              }
            </h4>
          </div>
          <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-1">
            {isLoading2 ? (
              <>
                <ShimmerCard />
                <ShimmerCard />
              </>
            ) : (
              APIdata2.map((data, index) => (
                <CollabPostCard key={index} data={data} />
              ))
            )}
          </div>
        </div>
      );
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response1 = await fetch(getAllJobPost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response1);
      const response2 = await fetch(getJobsOfSameCollege, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response1.ok || !response2.ok) {
        throw new Error("Network response was not ok");
      } else {
        const responseData1 = await response1.json();
        const responseData2 = await response2.json();
        setData1(responseData1.data);
        setData2(responseData2.data);
        setLoading1(false);
        setLoading2(false);
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      {/* Left side section */}
      <RenderLeftSide />

      {/* Right side section */}
      <div className="col-span-1 h-full overflow-y-auto rounded-xl 2xl:col-span-1">
        {/* Pass setLeftSide as a prop to TopCreators */}
        <TopCreators setLeftSide={setLeftSide} setName={setName} />

        {/* HistoryCard */}
        <HistoryCard />
      </div>
    </div>
  );
};

export default Marketplace;
