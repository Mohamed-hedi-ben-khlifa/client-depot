import React from "react";
import io from "socket.io-client";

const user = JSON.parse(localStorage.getItem('user'))

export const socket = io(process.env.REACT_APP_BASE_URL)

socket.on("connect", () => {});


export const SocketContext = React.createContext();