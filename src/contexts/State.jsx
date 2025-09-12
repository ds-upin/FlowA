import { createContext,useContext, useState } from "react";

export const StateContext = createContext(null);

export const StateProvider = (props) => {
    const [showContactProfile,setShowContactProfile] = useState(false);
    const [showProfile,setShowProfile] = useState(false);
    return (
        <StateContext.Provider value={{showContactProfile,setShowContactProfile,showProfile,setShowProfile}}>
            {props.children}
        </StateContext.Provider>
    );
};