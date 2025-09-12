import { createContext,useState } from "react";

export const ContactContext = createContext(null);

export const ContactProvider = (props) => {
    const [contact,setContact] = useState([]); // _id, username, name
    return (
        <ContactContext.Provider value={{contact,setContact}}>
            {props.children}
        </ContactContext.Provider>
    );
};