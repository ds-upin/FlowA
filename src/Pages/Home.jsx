import { useState, useContext, useEffect } from 'react';

import { AuthContext } from '../contexts/Auth';
import { StateContext } from '../contexts/State';
import { LoaderContext } from '../contexts/Loader';
import { ContactContext } from '../contexts/Contact';
import { SocketContext } from '../contexts/Socket';
import { ChatContext } from '../contexts/Chat';
import { ShowPopupContext } from '../contexts/ShowPopup';

import { getContactList, addToContactByIds } from '../services/contact.api';
import { getPendingList } from '../services/message.api';

import Login from '../components/Login';
import Loader from '../components/Loader';
import Profile from '../components/Profile';
import Register from '../components/Register';
import AddContact from '../components/AddContact';
import ContactCard from '../components/ContactCard';
import MessageBox from '../components/MessageBox';
import SelectedUser from '../components/SelectedUser';
import InputMessage from '../components/InputMessage';
import ContactProfile from '../components/ConatactProfile';
import SenderMessageBox from '../components/SenderMessageBox';
import EmailVerification from '../components/EmailVerification';
import BlockedUser from '../components/blockedUser';
import RecieverMessageBox from '../components/RecieverMessageBox';
import { BlockedContext } from '../contexts/Blocked';


const Home = () => {
    const { socket } = useContext(SocketContext);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showSideBar, setShowSideBar] = useState(true);
    const [showRightSideBar, setShowRightSideBar] = useState(true);
    const { chat, setChat } = useContext(ChatContext);
    const { auth, setAuth } = useContext(AuthContext);
    const { loader, setLoader } = useContext(LoaderContext);
    const { contact, setContact } = useContext(ContactContext);
    const { showPopup, setShowPopup } = useContext(ShowPopupContext);
    const { blocked, setBlocked } = useContext(BlockedContext);
    const { showContactProfile, setShowContactProfile, showBlockedUsers, setShowBlockedUsers, showEmailVerification, setShowEmailVerification, showProfile, setShowProfile, showRegister, setShowRegister, showLogin, setShowLogin } = useContext(StateContext);

    const addNewUserForChat = (userId) => {
        setChat(prevChat => ({
            ...prevChat,
            [userId]: []
        }));
    };
    const addMessageToChat = (userId, newMessage) => {
        setChat(prevChat => ({
            ...prevChat,
            [userId]: [
                ...(prevChat[userId] || []),
                newMessage
            ]
        }));
    };



    useEffect(() => {
        if (!socket) return;
        socket.emit('registerUser');

        const handleMessage = (data) => {
            console.log('Received message:', data);
            console.log('user',blocked);
            const { senderId, recieverId, message, date, } = data;
            const chatPartnerId = senderId === auth.id ? recieverId : senderId;
            const formattedMessage = {
                senderId,
                recieverId,
                message,
                date
            };
            const isBlocked = blocked.some(user => user._id === chatPartnerId);
            
            if (isBlocked) {
                console.log('Message ignored because sender is blocked:', chatPartnerId);
                return;
            }
            addMessageToChat(chatPartnerId, formattedMessage);
            const isInContacts = contact.some(c => c._id === chatPartnerId);
            if (!isInContacts) {
                const addContacts = async () => {
                    setLoader(true);
                    try {
                        const res = await addToContactByIds(auth.token, [chatPartnerId]);
                        if (res.status === 200) {
                            setContact(prevContacts => [...prevContacts, ...res.data.added]);
                        } else {
                            console.error('Failed to add contact:', res);
                        }
                    } catch (err) {
                        console.error('Error adding contact:', err);
                    }
                    setLoader(false);
                };
                addContacts();

            }
        };

        socket.on('recieveMessage', handleMessage);

        return () => {
            socket.off('recieveMessage', handleMessage);
        };
    }, [socket, auth.id,blocked]);

    useEffect(() => {
        const syncContactsWithChat = async () => {
            //setLoader(true);
            if (!auth.token || Object.keys(chat).length === 0 || contact.length === 0) return;
            const chatIds = Object.keys(chat);
            const contactIds = contact.map(c => c._id);
            const extraIds = chatIds.filter(id => !contactIds.includes(id));

            if (extraIds.length === 0) return;

            try {
                const res = await addToContactByIds(auth.token, extraIds);
                if (res.status === 200) {
                    setContact(prevContacts => [...prevContacts, ...res.data.added]);
                } else {
                    console.error('Failed to add extra contacts:', res);
                }
            } catch (err) {
                console.error('Error adding extra contacts:', err);
            }
            //setLoader(false);
        };

        syncContactsWithChat();
    }, [chat, contact, auth.token]);



    useEffect(() => {
        const shouldShowPopup = showContactProfile || showProfile || showRegister || showLogin || showEmailVerification;
        setShowPopup(shouldShowPopup);
    }, [showContactProfile, showProfile, showRegister, showLogin, showEmailVerification, setShowPopup]);

    useEffect(() => {
        if (auth.email == '') {
            setShowLogin(true);
        }
        else {
            setShowLogin(false);
        }
    }, [auth]);
    const getContacts = async () => {
        setLoader(true);
        try {
            const res = await getContactList(auth.token);
            if (res.status == 200) {
                console.log(res.data)
                setContact(res.data.contacts);
                setBlocked(res.data.blocked);
            } else {
                console.log("Error in fetching contact");
                alert(("Error in fetching contact list"));
            }
        } catch (err) {
            console.log("Error in fetching contact list");
        }
        setLoader(false);
    }

    const getPendingMessages = async () => {
        setLoader(true);
        try {
            const res = await getPendingList(auth.token);
            if (res.status == 200) {
                const messages = res.data.messages;
                const groupedChat = {};

                messages.forEach(msg => {
                    const chatPartnerId = msg.senderId === auth.id ? msg.recieverId : msg.senderId;

                    if (!groupedChat[chatPartnerId]) {
                        groupedChat[chatPartnerId] = [];
                    }
                    console.log(msg)
                    groupedChat[chatPartnerId].push({
                        senderId: msg.senderId,
                        recieverId: msg.recieverId,
                        message: msg.message,
                        date: msg.date
                    });
                });
                setChat(groupedChat);
            } else {
                console.log("Error in fetching contact");
                alert(("Error in fetching contact list"));
            }
        } catch (err) {
            console.log("Error in fetching contact list");
        }
        setLoader(false);
    }

    useEffect(() => {
        if (auth.email != '') {
            getContacts();
            getPendingMessages();
        }
    }, [auth]);




    return <div className="flex w-[100vw] h-[100vh] bg-gradient-to-r from-gray-300 to-gray-400">

        {showContactProfile ? <ContactProfile showContact={setShowContactProfile} getContacts={getContacts} setSelectedUser={setSelectedUser} selectedUser={selectedUser} /> : null}
        {showProfile ? <Profile /> : null}
        {loader ? <Loader /> : null}
        {showRegister ? <Register /> : null}
        {showLogin ? <Login /> : null}
        {showEmailVerification ? <EmailVerification /> : null}
        {showBlockedUsers ? <BlockedUser /> : null}

        <div className={`shadow-xl/30 grid grid-cols-3 grid-rows-5 bg-transparent border bg-transparent bg-opacity-50 rounded-xl my-auto mx-auto w-[90%] h-[90%] ${showPopup ? 'pointer-events-none filter blur-sm' : ''}`}>

            <div className={`col-span-1 rounded-tl-xl row-span-1 p-4 flex items-center ${showSideBar&&!showRightSideBar?'col-span-3':''}  ${!showSideBar&&showRightSideBar?'hidden':''}`}>
                <i className=" text-red-500 text-shadow-lg/40 fa-solid fa-comments text-7xl"></i>
                <div className="font-serif text-red-500 text-shadow-lg/40 cursor-default italic text-3xl" onClick={() => console.log("chat", chat)}>
                    Flow
                </div>
                <div className="grow-1"></div>
                <div className="text-lg"><i className="fas fa-search"></i></div>
            </div>

            {<SelectedUser showContact={setShowContactProfile} selectedUser={selectedUser} showRightSideBar={showRightSideBar} showSideBar={showSideBar} />}

            <div className={`col-span-1 overflow-y-auto rounded-bl-xl scroll-smooth row-span-4 border-1 ${showSideBar&&!showRightSideBar?'col-span-3':''}  ${!showSideBar&&showRightSideBar?'hidden':''}`}>
                {<AddContact getContacts={getContacts} />}
                {contact.length > 0 && contact.map((data) => <ContactCard key={data._id} contact={data} setSelectedUser={setSelectedUser} selectedUser={selectedUser} />)}
            </div>

            <div className={`col-span-2 rounded-br-xl row-span-4 flex flex-col ${showSideBar&&!showRightSideBar?'hidden':''} ${!showSideBar&&showRightSideBar?'col-span-3':''}`}>
                <div className="grow-1 basis-4/5 overflow-y-auto scroll-smooth flex flex-col">
                    {<MessageBox selectedUser={selectedUser} />}

                </div>
                {<InputMessage selectedUser={selectedUser} />}
            </div>
        </div>
    </div>
};

export default Home;