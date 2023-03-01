const Log = ({ logMessage }) => {
  return (
    <div
      id="logWin"
      className="border-2 px-2 bg-black text-white overflow-auto h-[100px] md:h-[480px] md:w-[200px] break-words"
    >
      <ul className="flex flex-col-reverse gap-y-[5px] text-sm">
        {logMessage.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Log;
