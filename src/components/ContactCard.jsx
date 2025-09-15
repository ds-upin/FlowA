import assett from '../assets/assett.jpg';
import SelectedUser from './SelectedUser';
const ContactCard = (props) => {
    const contact = props.contact;
    const setSelectedUser = props.setSelectedUser;
    const selectedUser = props.selectedUser;
    console.log(contact);
    return (
        <div className='w-full aspect-5/1 flex flex-row items-center border-1 cursor-default hover:bg-white' onClick={()=>{setSelectedUser(contact)}}>
            <div className='h-[70%] aspect-1/1 overflow-hidden rounded-full ml-4 mr-4 '>
                <img src={assett} />
            </div>
            <div className="text-2xl">{contact.name}</div>
            <div className="grow-1"></div>
            <div className='aspect-1/1 text-md mr-6 rounded-full'>2</div>
        </div>
    );
};

export default ContactCard