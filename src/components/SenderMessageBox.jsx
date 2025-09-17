const SenderMessageBox = ({ message, date }) => {
    return (
        <div className="cursor-default bg-blue-200 text-black w-fit p-2 rounded-md mb-2 max-w-[60%] relative">
            <div>{message}</div>

            <div className="text-xs text-gray-700 flex justify-end mt-1 pr-1">
                <span>{date}</span>
            </div>
        </div>
    );
};

export default SenderMessageBox;
