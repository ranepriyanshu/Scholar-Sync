import React from "react";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Card from "components/card";

const PreviousPost = () => {
  const PreviousPostsData = [
    {
      image: Nft1,
      title: "Cardiovascular Disease Prediction",
      time: "30s",
    },
    {
      image: Nft2,
      title: "Sentiment Analysis",
      time: "50m",
    },
    {
      image: Nft3,
      title: "AI Brain Modelling",
      time: "20s",
    },
    {
      image: Nft4,
      title: "Dementia Detection using CNN",
      time: "4h",
    },
    {
      image: Nft5,
      title: "Fake news Detection",
      time: "30s",
    },
    {
      image: Nft6,
      title: "Sepsis Prediction using ML",
      time: "2m",
    },
  ];

  return (
    <Card extra={"mt-2 !z-5 overflow-hidden"}>
      {/* PreviousPost Header */}
      <div className="mx-4 flex items-center justify-between rounded-t-3xl p-4">
        <div className=" text-xl font-bold text-navy-700 dark:text-white">
          Previous Posts
        </div>
        <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          See all
        </button>
      </div>

      {/* Previous Posts Data */}
      {PreviousPostsData.map((data, index) => (
        <div key={index} className="flex h-full w-full items-start bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700">
          <div className="flex items-center justify-around gap-5">
            <div className="flex h-16 w-16 items-center justify-center">
              <img
                className="h-full w-full rounded-xl"
                src={data.image}
                alt=""
              />
            </div>
            <div className=" w-full justify-between">
              <h5 className="text-base font-bold text-navy-700 dark:text-white ">
                {data.title}
              </h5>
              <div className="ml-2 flex items-center text-right text-sm font-normal text-gray-600 dark:text-white">
                <p>{data.time}</p>
                <p className="ml-1">ago</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default PreviousPost;
