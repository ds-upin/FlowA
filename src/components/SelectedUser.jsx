import assett from '../assets/assett.jpg';
import { useContext } from 'react';
import { LoaderContext } from '../contexts/Loader';
import { StateContext } from '../contexts/State';

const SelectedUser = (props) => {
    const {loader,setLoader} = useContext(LoaderContext);
    const {showProfile,setShowProfile} = useContext(StateContext);
    const selectedUser = props.selectedUser;
    const showSideBar= props.showSideBar;
    const showRightSideBar = props.showRightSideBar;

    const triggerContactProfile = () => {
        props.showContact(true);
    };

    const showUserProfile = () => {
        setShowProfile(true);
    }

    return (
        <div className={`col-span-2 rounded-tr-xl row-span-1 bg-gray-400 flex flex-row items-center gap-3 ${showSideBar&&!showRightSideBar?'hidden':''} ${!showSideBar&&showRightSideBar?'col-span-3':''}`}>
            <div className="ml-6 rounded-full h-[70%] aspect-1/1 bg-blue-500 cover overflow-hidden cursor-pointer" onClick={triggerContactProfile}>
                {selectedUser?<img src={assett} />:null}
            </div>
            <div className="text-4xl cursor-pointer" onClick={triggerContactProfile}>
                {selectedUser?selectedUser.name:""}
            </div>
            <div className='grow-1'></div>
            <div className='mr-6 text-4xl'><button onClick={showUserProfile}>
                <i className="fa-solid fa-gear transition-transform duration-1000 ease-in-out hover:rotate-[90deg]"></i>
                </button>
            </div>
        </div>
    );
};
export default SelectedUser;