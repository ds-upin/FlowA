const RecieverMessageBox = ({ message, date, status }) => {
    console.log(status)
    return (
        <div className="cursor-default text-black w-fit p-2 ml-auto rounded-md mb-2 max-w-[60%] bg-green-200 relative">
            <div>{message}</div>

            <div className="text-xs text-gray-700 flex justify-end gap-1 mt-1">
                <span>{date}</span>
                <span>
                    {status == 'delivered' ?
                        <><i className="fa-solid fa-check"></i>
                            <i className="fa-solid fa-check"></i></> :
                        <i className="fa-solid fa-check"></i>
                    }

                </span>
            </div>
        </div>
    );
};

export default RecieverMessageBox;
