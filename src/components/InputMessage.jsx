const InputMessage = () => {
    return (
        <div className="basis-1/5 flex justify-center items-center border-2 border-solid rounded-br-xl">

            <button className="mr-1 px-4 bg-blue-500 text-[120%] mb-2 rounded-lg hover:bg-blue-600">
                <i className="fa-solid fa-plus"></i>
            </button>
            <div className="w-[70%] shadow-red-500">
                <textarea
                    className="w-full border resize-none text-[120%] bg-red text-black rounded-lg focus:ring focus:ring-red-300 overflow-hidden"
                    placeholder="Write your message..."
                    rows="1"
                />
            </div>
            <button className="ml-1 px-4 bg-blue-500 text-[120%] mb-2 rounded-lg hover:bg-blue-950">
                <i className="text-white text-lg fa-solid fa-paper-plane"></i>
            </button>
        </div>
    )
};
export default InputMessage;