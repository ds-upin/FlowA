import assett from '../assets/assett.jpg';
import ContactCard from '../components/ContactCard';
import SenderMessageBox from '../components/SenderMessageBox';
import RecieverMessageBox from '../components/RecieverMessageBox';
import SelectedUser from '../components/SelectedUser';


const Home = () => {

    return <div className="flex w-[100vw] h-[100vh] bg-gradient-to-r from-red-100 to-blue-400">
        <div className="shadow-xl/30 grid grid-cols-3 grid-rows-5 bg-transparent border bg-transparent bg-opacity-50 rounded-xl my-auto mx-auto w-[90%] h-[90%]">


            <div className="col-span-1 rounded-tl-xl row-span-1 p-4 flex items-center">
                <i className=" text-red-500 text-shadow-lg/40 fa-solid fa-comments text-7xl"></i>
                <div className="font-serif text-red-500 text-shadow-lg/40 cursor-default italic text-3xl">
                    FlowA
                </div>
                <div className="grow-1"></div>
                <div className="text-lg"><i className="fas fa-search"></i></div>
            </div>


            <div className="col-span-2 rounded-tr-xl row-span-1 bg-gray-400 flex flex-row items-center gap-3">
                <div className="ml-6 rounded-full h-[70%] aspect-1/1 bg-blue-500 cover overflow-hidden">
                    <img src={assett} />
                </div>
                <div className="text-4xl">
                    Someone
                </div>
                <div className='grow-1'></div>
                <div className='mr-6 text-4xl'>
                    <i className="fa-solid fa-gear transition-transform duration-1000 ease-in-out hover:rotate-[90deg]"></i>
                </div>
            </div>


            <div className="col-span-1 overflow-y-auto rounded-bl-xl scroll-smooth row-span-4 border-1">

                {[1,2,3,4,5,6,7,8].map((i)=><ContactCard key={i}/>)}
                
            </div>


            <div className="col-span-2 rounded-br-xl row-span-4 flex flex-col">
                <div className="grow-1 basis-4/5 overflow-y-auto scroll-smooth flex flex-col">
                    {<SenderMessageBox/>}
                    {<RecieverMessageBox/>}

                </div>
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
            </div>


        </div>
    </div>
};

export default Home;