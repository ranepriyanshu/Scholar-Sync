import React from "react";
import { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import cardData from "./components/cardData";
import PaperSearch from "./components/PaperSearch";
import Card from "./components/Card";

const Dashboard = () => {
  const sentences = [
    "A Centralised Research Collaboration Portal",
    "Dedicated website for promoting research",
    "Creating a network between different institutions.",
    "Discover, Connect and Collaborate...",
  ];

  const sentenceIndexRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      sentenceIndexRef.current =
        (sentenceIndexRef.current + 1) % sentences.length;
    }, 3000);

    return () => clearInterval(intervalId);
  }, [sentences.length]);

  return (
    <div className="mt-4">
      <h1 className="inline-block rounded-tr-2xl rounded-br-2xl bg-[#5f67ff] py-4 px-12 text-5xl text-white">
        Scholar Sync
      </h1>
      <div className="center mt-4 text-4xl font-bold text-[#5f67ff] dark:text-white">
        <Typewriter
          options={{
            strings: sentences,
            autoStart: true,
            loop: true,
            deleteSpeed: 50,
            delay: 100,
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cardData.map((data, index) => (
          <Card
            key={index}
            aim={data.aim}
            imgURL={data.image}
            text={data.text}
          />
        ))}
      </div>
      <div className=" mt-4">
        <PaperSearch />
      </div>
    </div>
  );
};

export default Dashboard;
