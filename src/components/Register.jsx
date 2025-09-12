const Register = () => {
    return (
        <div className="fixed z-50 bg-gray-900 text-white rounded-xl cursor-default w-[90%] h-[90%] left-[5%] top-[5%]
        md:w-[30%] md:h-[70%] md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">

            <div className="text-center text-2xl font-semibold py-4 border-b border-gray-700">
                Register
            </div>

            <div className="flex flex-col gap-2 p-3">
                <label htmlFor="email" className="text-sm font-light">
                    Email
                </label>
                <input type="email" name="email" id="email" className="p-1 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                <label htmlFor="username" className="text-sm font-light">
                    Username{" (Can't be changed)" }
                </label>
                <input type="username" name="username" id="username" className="p-1 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                <label htmlFor="password" className="text-sm font-light">
                    Password
                </label>
                <input type="password" name="password" id="password" className="p-1 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <label htmlFor="passwordc" className="text-sm font-light">
                    Confirm Password
                </label>
                <input type="password" name="passwordc" id="passwordc" className="p-1 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <div className="flex justify-center mt-4">
                    <button className="bg-blue-500 hover:bg-blue-600 px-6 py-1 rounded-lg text-white font-semibold">
                        Register
                    </button>
                </div>
                <div className="text-sm text-center hover:underline text-gray-100">Have account? Login here!!</div>
            </div>
        </div>
    );
};

export default Register;
