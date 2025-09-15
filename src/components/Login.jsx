import { useContext,useRef,useState } from "react";
import { StateContext } from "../contexts/State";
import { LoaderContext } from "../contexts/Loader";
import { AuthContext } from "../contexts/Auth";
import { login } from "../services/auth.api";

const Login = () => {
    const {setShowLogin, setShowRegister} = useContext(StateContext);
    const {auth,setAuth} = useContext(AuthContext);
    const {loader,setLoader} = useContext(LoaderContext);
    const [disable,setDisable] = useState(false);

    const emailRef = useRef();
    const passRef = useRef();

    const gotoregister = ()=>{
        setShowLogin(false);
        setShowRegister(true);
    }

    const loginuser = async()=>{
        setLoader(true);
        setDisable(true);
        const email = emailRef.current.value.trim();
        const password = passRef.current.value.trim();
        if(!email||!password||email==""||password==""){
            setLoader(false);
            setDisable(false);
            
            return;
        }
        try{
            const res = await login({email,password});
            if(res.status==200){
                //alert("Logged In");
                setDisable(false);
                setLoader(false);
                setAuth(res.data.user);
            }else{
                alert(res.data.mess);
            }
        }catch(err){
            console.log(err);
        }
        setDisable(false);
        setLoader(false);

    }
    return (
        <div className="fixed z-50 bg-gray-900 text-white rounded-xl cursor-default w-[90%] h-[90%] left-[5%] top-[5%]
        md:w-[30%] md:h-[70%] md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">

            <div className="text-center text-2xl font-semibold py-4 border-b border-gray-700">
                LOGIN
            </div>

            <div className="flex flex-col gap-4 p-6">
                <label htmlFor="username" className="text-sm font-light">
                    Email
                </label>
                <input type="text" name="username" ref={emailRef} id="username" className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                <label htmlFor="password" className="text-sm font-light">
                    Password
                </label>
                <input type="password" name="password" ref={passRef} id="password" className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                <div className="flex justify-center mt-4">
                    <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg text-white font-semibold" disabled={disable} onClick={loginuser}>
                        {disable?"Processing":"Login"}
                    </button>
                </div>
                <div className="text-sm text-center hover:underline text-gray-100" onClick={gotoregister}>Don't have account? Register here!</div>
            </div>
        </div>
    );
};

export default Login;
