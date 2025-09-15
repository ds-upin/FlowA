import { createContext, useContext, useState } from "react";

export const StateContext = createContext(null);

export const StateProvider = (props) => {
    const [showContactProfile, setShowContactProfile] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showEmailVerification, setShowEmailVerification] = useState(false);
    return (
        <StateContext.Provider value={{ showContactProfile, setShowContactProfile, showProfile, setShowProfile, showLogin, setShowLogin, showRegister, setShowRegister, showEmailVerification, setShowEmailVerification }}>
            {props.children}
        </StateContext.Provider>
    );
};