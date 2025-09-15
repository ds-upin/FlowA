import assett from '../assets/assett.jpg';
import Loader from '../components/Loader';
import ContactCard from '../components/ContactCard';
import SenderMessageBox from '../components/SenderMessageBox';
import RecieverMessageBox from '../components/RecieverMessageBox';
import SelectedUser from '../components/SelectedUser';
import InputMessage from '../components/InputMessage';
import { useState, useContext, useEffect } from 'react';
import { LoaderContext } from '../contexts/Loader';
import { ShowPopupContext } from '../contexts/ShowPopup';
import { StateContext } from '../contexts/State';
import { AuthContext } from '../contexts/Auth';
import ContactProfile from '../components/ConatactProfile';
import Profile from '../components/Profile';
import Login from '../components/Login';
import Register from '../components/Register';
import EmailVerification from '../components/EmailVerification';
import { getContactList } from '../services/contact.api';
import { ContactContext } from '../contexts/Contact';
import AddContact from '../components/AddContact';


const Home = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const { auth, setAuth } = useContext(AuthContext);
    const { showPopup, setShowPopup } = useContext(ShowPopupContext);
    const { loader, setLoader } = useContext(LoaderContext);
    const { contact, setContact } = useContext(ContactContext);
    const { showContactProfile, setShowContactProfile, showEmailVerification, setShowEmailVerification, showProfile, setShowProfile, showRegister, setShowRegister, showLogin, setShowLogin } = useContext(StateContext);

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
            console.log(auth);
        }
    }, [auth]);
    const getContacts = async () => {
        try {
            //console.log('authtoken',auth.token);
            const res = await getContactList(auth.token);
            if (res.status == 200) {
                setContact(res.data.contacts);
            } else {
                console.log("Error in fetching contact");
                alert(("Error in fetching contact list"));
            }
        } catch (err) {
            console.log("Error in fetching contact list");
        }
    }

    useEffect(() => {
        if (auth.email != '') {
            getContacts();
        }
    }, [auth]);

    return <div className="flex w-[100vw] h-[100vh] bg-gradient-to-r from-red-100 to-blue-400">

        {showContactProfile ? <ContactProfile showContact={setShowContactProfile} getContacts={getContacts} setSelectedUser={setSelectedUser} selectedUser={selectedUser} /> : null}
        {showProfile ? <Profile /> : null}
        {loader ? <Loader /> : null}
        {showRegister ? <Register /> : null}
        {showLogin ? <Login /> : null}
        {showEmailVerification ? <EmailVerification /> : null}

        <div className={`shadow-xl/30 grid grid-cols-3 grid-rows-5 bg-transparent border bg-transparent bg-opacity-50 rounded-xl my-auto mx-auto w-[90%] h-[90%] ${showPopup ? 'pointer-events-none filter blur-sm' : ''}`}>

            <div className="col-span-1 rounded-tl-xl row-span-1 p-4 flex items-center">
                <i className=" text-red-500 text-shadow-lg/40 fa-solid fa-comments text-7xl"></i>
                <div className="font-serif text-red-500 text-shadow-lg/40 cursor-default italic text-3xl">
                    Flow
                </div>
                <div className="grow-1"></div>
                <div className="text-lg"><i className="fas fa-search"></i></div>
            </div>

            {<SelectedUser showContact={setShowContactProfile} selectedUser={selectedUser} />}

            <div className="col-span-1 overflow-y-auto rounded-bl-xl scroll-smooth row-span-4 border-1">
                {<AddContact getContacts={getContacts} />}
                {contact.length > 0 && contact.map((data) => <ContactCard key={data._id} contact={data} setSelectedUser={setSelectedUser} selectedUser={selectedUser} />)}
            </div>

            <div className="col-span-2 rounded-br-xl row-span-4 flex flex-col">
                <div className="grow-1 basis-4/5 overflow-y-auto scroll-smooth flex flex-col">
                    {<SenderMessageBox />}
                    {<RecieverMessageBox />}
                </div>
                {<InputMessage />}
            </div>
        </div>
    </div>
};

export default Home;