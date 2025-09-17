import SenderMessageBox from "./SenderMessageBox";
import RecieverMessageBox from "./RecieverMessageBox";
import { useContext,useRef,useEffect } from "react";
import { AuthContext } from "../contexts/Auth";
import { ChatContext } from "../contexts/Chat";

const MessageBox = ({ selectedUser }) => {
    const { auth } = useContext(AuthContext);
    const { chat } = useContext(ChatContext);
    const messageRef = useRef();
    const messages = chat[selectedUser?._id] || [];
    useEffect(()=>{
        messageRef.current?.scrollIntoView({behavior: "smooth"})
    },[chat]);


    return (
        <>
            {messages.map((msg, index) => {
                const formattedTime = new Date(msg.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                });
                if(msg.status && msg.status=='delivered'){
                    messages.map((m,i)=>{
                        if(m.status){
                            m.status=='delivered'
                        }
                    });
                }
                return msg.senderId === auth.id ? (
                    <RecieverMessageBox key={index} message={msg.message} status={msg.status} date={formattedTime} />
                ) : (
                    <SenderMessageBox key={index} message={msg.message} date={formattedTime} />
                );
            })}
            <div ref={messageRef}/>
        </>
    );
};

export default MessageBox;
