import ChatMenu from "./ChatMenu";
import SearchBar from "./SearchBar";
import NavBar from "./Navbar";
import { useState } from "react";
const SideBar = () => {
  const [userName, setUserName] = useState("");
  return (
    <div className="rounded-bl-md w-5/12 rounded-tl-md bg-blue-50">
      <NavBar />
      <SearchBar setUserName={setUserName} />
      <ChatMenu userName={userName} />
    </div>
  );
};
export default SideBar;
