import './App.css';
import Connexion from './connexion/Connexion'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';

import Deposant from './route/Deposant';
import { information } from './store/boutiqueSlice';
import { SocketContext, socket } from './context/socket'
import { rechercher_deposant_par_id } from './store/deposantSlice';





function App() {
  
  const dispatch = useDispatch()
  useEffect(() => {dispatch(information())}, [dispatch])


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  useEffect(() => {setUser((JSON.parse(localStorage.getItem('user'))))}, [,setUser])






  return (
    <SocketContext.Provider value={socket}>
      <div className="App">


        {
          user && user.role === 'deposant' ?
            <Deposant setUser={setUser} user={user}>

            </Deposant>


            : <Routes>
              < Route path="/connexion" exact element={
                <Connexion setUser={setUser}></Connexion>
              } />
            </Routes>
        }

      </div>
    </SocketContext.Provider>
  );
}

export default App;
