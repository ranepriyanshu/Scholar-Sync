const Message = ({ message }) => {
  return (
    <div className="m-2 flex items-center">
      <div className="ml-4 rounded-tl-md rounded-br-md bg-white p-2">
        <p>{message}</p>
      </div>
    </div>
  );
};
export default Message;
