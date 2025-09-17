import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../contexts/Socket";
import { AuthContext } from "../contexts/Auth";
import { ChatContext } from "../contexts/Chat";

const InputMessage = (props) => {
    const selectedUser = props.selectedUser;
    const { chat, setChat } = useContext(ChatContext);
    const { auth, setAuth } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const inputRef = useRef();
    const addMessageToChat = (userId, newMessage) => {
        setChat(prevChat => ({
            ...prevChat,
            [userId]: [
                ...(prevChat[userId] || []),
                newMessage
            ]
        }));
    };

    const sendMessage = () => {
        const message = inputRef.current.value.trim();
        if (message == '') return;
        if (auth.email == '' || selectedUser == null) return;
        socket.emit('sendMessage', { message, senderId: auth.id, id: selectedUser._id, date: Date.now() }, (res) => {
            console.log(res.status)
            addMessageToChat(selectedUser._id, { message: message, senderId: auth.id, recieverId: selectedUser._id, date: Date.now(), status: res.status });
        });
        inputRef.current.value = '';
    };

    return (
        <div className="basis-1/5 flex justify-center items-center border-2 border-solid rounded-br-xl ">

            <button className="mr-1 px-4 bg-blue-500 text-[120%] mb-2 rounded-lg hover:bg-blue-600">
                <i className="fa-solid fa-plus"></i>
            </button>
            <div className="w-[70%] shadow-red-500">
                <textarea
                    className="w-full border resize-none text-[120%] bg-red text-black rounded-lg focus:ring focus:ring-red-300 overflow-hidden"
                    placeholder="Write your message..." ref={inputRef}
                    rows="1"
                />
            </div>
            <button className="ml-1 px-4 bg-blue-500 text-[120%] mb-2 rounded-lg hover:bg-blue-950" onClick={sendMessage}>
                <i className="text-white text-lg fa-solid fa-paper-plane"></i>
            </button>
        </div>
    )
};
export default InputMessage;