import React from "react";
import io from "socket.io-client";

const user = JSON.parse(localStorage.getItem('user'))

export const socket = io("https://backend-depot.herokuapp.com");

socket.on("connect", () => {});


export const SocketContext = React.createContext();