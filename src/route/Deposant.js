import React, { useContext, useEffect } from 'react'
import NavBar from '../deposant/component/NavBar'
import Footer from '../deposant/component/Footer'
import Accueil from '../deposant/accueil/Accueil'
import { Routes, Route } from 'react-router-dom'
import Articles from '../deposant/article/Articles'
import Reçus from '../deposant/reçu/Reçus'
import Notifications from '../deposant/notification/Notifications'
import { SocketContext } from '../context/socket';
import Profile from '../deposant/profile/Profile'


export default function Deposant(props) {
    
 
    const socket = useContext(SocketContext);
    useEffect(()=>{
        socket.emit("newUser", props.user)
    },[])

 
    return (
        <div>
            <div style={{ width: '80%', marginLeft: '10%' }}>

                <NavBar setUser={props.setUser} user={props.user}  />
               
                <Routes>
                    <Route path='/deposant/articles' element={<Articles user={props.user} ></Articles>} />
                    <Route path='/deposant/recus' element={<Reçus user={props.user} ></Reçus>} />
                    <Route path='/deposant/profile' element={<Profile user={props.user} ></Profile>} />
                    <Route path='/deposant/notifications' element={<Notifications user={props.user}></Notifications>} />


                </Routes>

                <Footer />

            </div>
        </div>
    )
}

