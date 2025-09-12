import assett from '../assets/assett.jpg';
import Loader from '../components/Loader';
import ContactCard from '../components/ContactCard';
import SenderMessageBox from '../components/SenderMessageBox';
import RecieverMessageBox from '../components/RecieverMessageBox';
import SelectedUser from '../components/SelectedUser';
import InputMessage from '../components/InputMessage';
import { useState } from 'react';


const Home = () => {
    const [showPopup,setShowPopup] = useState(false);
    const [loader, setLader] = useState(true);

    return <div className="flex w-[100vw] h-[100vh] bg-gradient-to-r from-red-100 to-blue-400">
        <div className={`shadow-xl/30 grid grid-cols-3 grid-rows-5 bg-transparent border bg-transparent bg-opacity-50 rounded-xl my-auto mx-auto w-[90%] h-[90%] ${showPopup?'pointer-events-none filter blur-sm':''}`}>
        {loader?<Loader/>:null}
            <div className="col-span-1 rounded-tl-xl row-span-1 p-4 flex items-center">
                <i className=" text-red-500 text-shadow-lg/40 fa-solid fa-comments text-7xl"></i>
                <div className="font-serif text-red-500 text-shadow-lg/40 cursor-default italic text-3xl">
                    FlowA
                </div>
                <div className="grow-1"></div>
                <div className="text-lg"><i className="fas fa-search"></i></div>
            </div>

            {<SelectedUser/>}

            <div className="col-span-1 overflow-y-auto rounded-bl-xl scroll-smooth row-span-4 border-1">
                {[1,2,3,4,5,6,7,8].map((i)=><ContactCard key={i}/>)}
            </div>

            <div className="col-span-2 rounded-br-xl row-span-4 flex flex-col">
                <div className="grow-1 basis-4/5 overflow-y-auto scroll-smooth flex flex-col">
                    {<SenderMessageBox/>}
                    {<RecieverMessageBox/>}

                </div>
                {<InputMessage/>}
            </div>
        </div>
    </div>
};

export default Home;