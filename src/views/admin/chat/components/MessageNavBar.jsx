const MessageNavBar = () => {
  const userData = localStorage.getItem("userData");
  return (
    <div className="flex items-center  justify-between bg-purple-500 text-white">
      <h1 className="pl-8">{userData?.data?.User?.fullName}</h1>
    </div>
  );
};
export default MessageNavBar;
