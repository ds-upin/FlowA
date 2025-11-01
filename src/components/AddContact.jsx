import { ContactContext } from "../contexts/Contact";
import { useContext,useRef } from "react";
import { addInContact } from "../services/contact.api";
import { AuthContext } from "../contexts/Auth";
import { LoaderContext } from "../contexts/Loader";

const AddContact = (props) => {
    const getContacts = props.getContacts;
    const usernameRef = useRef();
    const { auth, setAuth } = useContext(AuthContext);
    const {loader,setLoader} = useContext(LoaderContext);

    const AddContact = async () => {
        setLoader(true);
        const username = usernameRef.current.value.trim();
        if(username==='') return setLoader(false);;
        try {
            const res = await addInContact({ username, token: auth.token });
            if (res.status === 200) {
                console.log('Contact added:', res.data);
                getContacts();
            } else {
                console.log('Error:', res.data.mess);
            }
        } catch (err) {
            console.log("Error in adding contact");
        }
        setLoader(false);
    }
    return (
        <div className='w-full h-fit flex flex-row items-center border-1 cursor-default'>
            <div className="text-xl p-1"><input type="text" ref={usernameRef} placeholder="username" className="rounded-lg ml-1 border-2" /></div>
            <div className="grow-1"></div>
            <div className='text-md mr-1'><button className="bg-blue-400 pl-2 pt-1 pb-1 pr-2 rounded-lg hover:bg-blue-500" onClick={AddContact} disabled={auth.email == ''}>Add</button></div>
        </div>
    );
};
export default AddContact;