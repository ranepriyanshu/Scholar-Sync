import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { paper } from "../../../../constants/api";
import Shimmer from "./Shimmer";

const SearchBar = () => {
  const [paperAPIData, setpaperAPIData] = useState([]);

  const handleSubmit = async (e) => {
    setpaperAPIData([]);
    e.preventDefault();
    const paperTitle = e.target.elements.paperSearch.value;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(paper, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Send the search query as an object with the appropriate key
        body: JSON.stringify({ paperTitle }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      setpaperAPIData(responseData);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <div className="input-wrap  flex w-2/4 items-center justify-between rounded-tr-2xl rounded-br-2xl bg-[#5f67ff] p-4 ">
          <FontAwesomeIcon icon={faSearch} className="mr-2 text-white" />
          <input
            type="text"
            name="paperSearch"
            id="paper-search"
            placeholder="Enter the name of paper"
            className="flex-grow bg-[#5f67ff] text-xl text-white placeholder:text-white focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-3xl bg-gradient-to-r from-blue-500 to-blue-600 p-2 text-xl text-white shadow-md hover:from-blue-600 hover:to-blue-700"
          >
            Search
          </button>
        </div>
      </form>
      <div className="mt-4">
        {paperAPIData.length !== 0 &&
          paperAPIData.map((paper, index) => {
            return (
              <div
                key={index}
                className="mb-2 w-11/12 rounded-tr-2xl rounded-br-2xl bg-orange-300 p-4"
              >
                <h2 className="text-lg font-semibold">{paper}</h2>
              </div>
            );
          })}
        {paperAPIData.length === 0 && <Shimmer />}
      </div>
    </div>
  );
};

export default SearchBar;
