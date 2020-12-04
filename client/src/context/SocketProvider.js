import React, { useContext, useEffect, useState } from 'react';
const io = require("socket.io-client");

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {

    const [socket, setSocket] = useState()

    const HOST = process.env.HOST || "http://localhost:5000";

    useEffect(() => {
        const newSocket = io(
             HOST,
            {
                query: { id },
                withCredentials: true,
                extraHeaders: {
                "my-custom-header": "abcd"
                }
            }
        )
        setSocket(newSocket)

        return () => newSocket.close()
    }, [id, HOST])
    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
