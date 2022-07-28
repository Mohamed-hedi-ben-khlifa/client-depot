import './App.css';
import Connexion from './connexion/Connexion'
import Articles from './deposant/article/Articles'
import Profile from './deposant/profile/Profile'
import Notifications from './deposant/notification/Notifications'
import Reçus from './deposant/reçu/Reçus'

import { Private_Routes_Deposants } from './route/Private_Routes_Deposants'
import { rechercher_user_par_token } from './store/userSlice'


import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';


function App() {

  let navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState()
  const token = localStorage.getItem("token")


  useEffect(() => {
    if (token !== null)
      dispatch(rechercher_user_par_token()).then(action => {
        setUser(action.payload.user)
      })
  }, [])


  useEffect(() => {

    if (user?.role === "deposant" && token !== null) { navigate('/deposant/articles') }
    if (user === undefined || token === null) { navigate('/connexion') }

  }, [user, token, dispatch])


  return (
    <div className="App">

      <Routes>
        <Route element={<Private_Routes_Deposants user={user} role={user?.role} />}>
          <Route path='/deposant/articles' exact element={<Articles user={user} ></Articles>} />
          <Route path='/deposant/recus' exact element={<Reçus user={user} ></Reçus>} />
          <Route path='/deposant/profile' exact element={<Profile user={user} ></Profile>} />
          <Route path='/deposant/notifications' exact element={<Notifications user={user}></Notifications>} />
        </Route>

        <Route path='/connexion' element={<Connexion />} />
      </Routes>

    </div>
  );
}

export default App;
