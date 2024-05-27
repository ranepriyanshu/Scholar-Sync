import React from "react";
import Typewriter from "typewriter-effect";

const NavBar = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  
  return (
    <div className="flex h-16 items-center justify-between rounded-tl-md bg-[#5f67ff] px-4 text-lg text-white">
      <div className="font-bold text-xl p-4">
        <Typewriter
          options={{
            strings: ["SCHOLAR CHAT"],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
    </div>
  );
};

export default NavBar;
