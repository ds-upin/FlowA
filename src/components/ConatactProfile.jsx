import {ShowPopupContext} from '../contexts/ShowPopup';
import { useContext } from 'react';
import profileImg from '../assets/assett.jpg';

const ContactProfile = (props) => {
    const {showPopup,setShowPopup} = useContext(ShowPopupContext);

    const closeProfile = () => {
        props.showContact(false);
        setShowPopup(false);
    };

    return (
        <div className="fixed h-[90%] w-[90%] left-[5%] top-[5%] md:top-[15%] md:left-[35%] md:m-auto md:w-[30%] md:h-[70%] bg-gray-900 text-white z-5 rounded-xl cursor-default">
            <div className="w-100 flex flex-end text-xl">
                <button onClick={closeProfile}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="m-auto bg-gray-500 mt-5 w-[40%] aspect-1/1 rounded-full overflow-hidden">
            <img src={profileImg}/>
            </div>
            <div className="text-center pt-5 text-2xl">Someone</div>
            <div className='text-md text-center mt-7'><span>Username: </span><span>@ds_upin</span></div>
            <div className='text-md w-full flex justify-center mt-7'>
                <button className='bg-orange-500 cursor-pointer hover:bg-orange-600 rounded-lg px-5'>Delete</button>
                <button className='ml-2 cursor-pointer bg-red-500 hover:bg-red-600 rounded-lg px-5'>Block</button>
            </div>
        </div>
    );
};
export default ContactProfile;

