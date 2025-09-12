
import { createContext,useState } from "react";

export const ShowPopupContext = createContext(null);

export const ShowPopupProvider = (props) => {
    const [showPopup,setShowPopup] = useState(true);
    return (
        <ShowPopupContext.Provider value={{showPopup,setShowPopup}}>
            {props.children}
        </ShowPopupContext.Provider>
    );
};