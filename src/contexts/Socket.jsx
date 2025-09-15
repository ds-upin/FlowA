import React, { createContext, useEffect, useState, useContext } from 'react';
import { AuthContext } from './Auth';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!auth?.token) return; // wait until auth token is ready

        const socketIo = io('http://localhost:8000', {
            auth: {
                token: `Bearer ${auth.token}`,
            },
        });

        setSocket(socketIo);

        return () => {
            socketIo.disconnect();
        };
    }, [auth?.token]); // run when auth token changes

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
