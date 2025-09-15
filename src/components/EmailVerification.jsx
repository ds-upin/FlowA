import { useContext,useRef, useState } from "react";
import { StateContext } from "../contexts/State";
import { LoaderContext } from "../contexts/Loader";
import {verifyemail} from "../services/auth.api";

const EmailVerification = () => {
    const {setShowRegister, setShowLogin,setShowEmailVerification} = useContext(StateContext);
    const {loader,setLoader} = useContext(LoaderContext);
    const codeRef = useRef();
    const emailRef = useRef();
    const [error,setError] = useState(null);
    const [disable,setDisable] = useState(false);

    const gotoregister = () => {
        setShowEmailVerification(false);
        setShowRegister(true);
    };
    const gotologin = () => {
        setShowEmailVerification(false);
        setShowLogin(true);
    };
    const sendVerification = async() =>{
        setLoader(true);
        setDisable(true);
        const code = codeRef.current.value.trim();
        const email = emailRef.current.value.trim();
        if(!code||!email||code=="" ||email==""){
            return alert("Insufficient data");
        }
        try{
            const res = await verifyemail({email,code});
            if(res.status==201){
                alert(res.data.mess);
                setLoader(false);
                gotologin();
            }else{
                setError(res.data);
                alert(res.data.mess);
            }
        }catch{
            console.log("Failed to verify");
            setError("unexpected Error");
        }
        setLoader(false);
        setDisable(false);
    }
    return (
        <div className="fixed z-50 bg-gray-900 text-white rounded-xl cursor-default w-[90%] h-[90%] left-[5%] top-[5%]
        md:w-[30%] md:h-[70%] md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">

            <div className="text-center text-2xl font-semibold py-4 border-b border-gray-700">
                Verify your email
            </div>
            <div className="text-sm text-center text-gray-100">Verification code is sent on your email and will be valid for 2min</div>
            <div className="flex flex-col gap-4 p-6">
                <label htmlFor="username" className="text-sm font-light">
                    Email
                </label>
                <input type="text" name="username" ref={emailRef} id="username" className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <label htmlFor="code" className="text-sm font-light">
                    Code
                </label>
                <input type="number" name="code" ref={codeRef} id="code" className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <div className="flex justify-center mt-4">
                    <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg text-white font-semibold"disabled={disable} onClick={sendVerification}>
                        {disable?'Verifing..':"Verify"}
                    </button>
                </div>
                <div className="text-sm text-center hover:underline text-gray-100" onClick={gotoregister}>Don't have account? Register here!</div>
            </div>
        </div>
    );
}
export default EmailVerification;