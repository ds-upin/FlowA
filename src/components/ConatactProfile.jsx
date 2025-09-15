import { ShowPopupContext } from '../contexts/ShowPopup';
import { AuthContext } from '../contexts/Auth';
import { StateContext } from '../contexts/State';
import { useContext } from 'react';
import profileImg from '../assets/assett.jpg';
import { removeContact } from '../services/contact.api';

const ContactProfile = (props) => {
    const getContacts = props.getContacts;
    const selectedUser = props.selectedUser;
    const setSelectedUser = props.setSelectedUser;
    const {setShowContactProfile} = useContext(StateContext);
    const {auth, setAuth} = useContext(AuthContext);
    const { showPopup, setShowPopup } = useContext(ShowPopupContext);
    const closeProfile = () => {
        props.showContact(false);
        setShowPopup(false);
    };

    const removeThisContact = async () => {
        console.log(selectedUser);
        try {
            const res = await removeContact({
                token: auth.token,
                contactId: selectedUser._id
            });

            if (res.status === 200) {
                console.log("Contact removed successfully:", res.data.mess);
                getContacts();
                setSelectedUser(null);
                setShowContactProfile(false);

            } else {
                console.error("Error:", res.data.mess);
                alert(res.data.mess);
            }
        } catch (err) {
            console.error("Error removing contact:", err);
            alert("Something went wrong while removing contact.");
        }
    };

    return (
        <div className="fixed h-[90%] w-[90%] left-[5%] top-[5%] md:top-[15%] md:left-[35%] md:m-auto md:w-[30%] md:h-[70%] bg-gray-900 text-white z-5 rounded-xl cursor-default">
            <div className="w-100 flex flex-end text-xl">
                <button onClick={closeProfile}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="m-auto bg-gray-500 mt-5 w-[40%] aspect-1/1 rounded-full overflow-hidden">
                <img src={profileImg} />
            </div>
            <div className="text-center pt-5 text-2xl">{selectedUser ? selectedUser.name : ""}</div>
            <div className='text-md text-center mt-7'><span>Username: </span><span>{selectedUser ? selectedUser.username : ""}</span></div>
            <div className='text-md w-full flex justify-center mt-7'>
                <button className='bg-orange-500 cursor-pointer hover:bg-orange-600 rounded-lg px-5' onClick={removeThisContact}>Delete</button>
                <button className='ml-2 cursor-pointer bg-red-500 hover:bg-red-600 rounded-lg px-5'>Block</button>
            </div>
        </div>
    );
};

export default ContactProfile;