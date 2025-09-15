import { useRef, useContext, useState } from "react";
import { AuthContext } from "../contexts/Auth";
import { StateContext } from "../contexts/State";
import { register } from "../services/auth.api";
import { LoaderContext } from "../contexts/Loader";

const Register = () => {
    const {setShowRegister,setShowLogin,setShowEmailVerification} = useContext(StateContext);
    const {loader,setLoader} = useContext(LoaderContext);

    const nameRef = useRef();
    const emailRef = useRef();
    const usernameRef = useRef();
    const passRef = useRef();
    const passcRef = useRef();
    const [error, setError] = useState(null);
    const [disable,setDisable] = useState(false);
    const [success, setSuccess] = useState(null);

    const Register = async () => {
        setLoader(true);
        setDisable(true);
        const name = nameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const username = usernameRef.current.value.trim();
        const password = passRef.current.value;
        const passwordConfirm = passcRef.current.value;
        if (!name || !email || !username || !password || !passwordConfirm) {
            setError("Please fill in all fields.");
            setDisable(false);
            setLoader(false);
            return;
        }
        if (password !== passwordConfirm) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await register({ name, email, username, password });
            if (res.status==201) {
                setSuccess("Registered successfully! Please check your email for verification.");
                gotoemailverification();

            } else {
                alert(res.data);
                setError(data.mess || "Registration failed.");
            }
        } catch (err) {
            setError("Server error. Please try again later.");
        }
        setLoader(false);
        setDisable(false);
    }

    const gotologin = () =>{
        setShowRegister(false);
        setShowLogin(true);
    }
    const gotoemailverification = () => {
        setShowRegister(false);
        setShowEmailVerification(true);
    }

    return (
        <div className="fixed z-50 bg-gray-900 text-white rounded-xl cursor-default w-[90%] h-[90%] left-[5%] top-[5%] md:w-[30%] md:h-[80%] md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">

            <div className="text-center text-2xl font-semibold py-4 border-b border-gray-700">
                Register
            </div>

            <div className="flex flex-col gap-2 p-3">
                <label htmlFor="username" className="text-sm font-light">
                    Name
                </label>
                <input type="text" name="name" ref={nameRef} id="name" className="p-1 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <label htmlFor="email" className="text-sm font-light">
                    Email
                </label>
                <input type="email" name="email" id="email" ref={emailRef} className="p-1 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <label htmlFor="username" className="text-sm font-light">
                    Username{" (Can't be changed)"}
                </label>
                <input type="text" name="username" ref={usernameRef} id="username" className="p-1 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <label htmlFor="password" className="text-sm font-light">
                    Password
                </label>
                <input type="password" name="password" ref={passRef} id="password" className="p-1 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <label htmlFor="passwordc" className="text-sm font-light">
                    Confirm Password
                </label>
                <input type="password" name="passwordc" ref={passcRef} id="passwordc" className="p-1 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <div className="flex justify-center mt-4">
                    <button  disabled={disable} className="bg-blue-500 hover:bg-blue-600 px-6 py-1 rounded-lg text-white font-semibold" onClick={Register}>
                        {disable?"Processing..":"Register"}
                    </button>
                </div>
                <div className="text-sm text-center hover:underline text-gray-100" onClick={gotologin}>Have account? Login here!!</div>
            </div>
        </div>
    );
};

export default Register;
