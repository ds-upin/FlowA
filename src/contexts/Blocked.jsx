import { createContext, useState } from "react";

export const BlockedContext = createContext(null);

export const BlockedProvider = (props) => {
    const [blocked, setBlocked] = useState([]); // _id, username, name
    return (
        <BlockedContext.Provider value={{ blocked, setBlocked }}>
            {props.children}
        </BlockedContext.Provider>
    );
};