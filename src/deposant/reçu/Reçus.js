import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Liste_des_reçus_verser from '../reçu/component/Liste_des_reçus_verser'
import Liste_des_reçus_deposer from '../reçu/component/Liste_des_reçus_deposer'

import { rechercher_reçu_deposant ,liste_des_reçus_payer} from '../../store/reçuSlice'
import Accueil from '../accueil/Accueil'
import { rechercher_user_par_token } from '../../store/userSlice'



export default function Reçus() {


  const dispatch = useDispatch()
 
  const [reçus_deposer, setReçus_deposer] = useState([])
  const [reçus_payer, setReçus_payer] = useState([])

  const [user, setUser] = useState()
  const token = localStorage.getItem("token")

    useEffect(() => {
        if (token !== null)
          dispatch(rechercher_user_par_token()).then(action => {
            setUser(action.payload.user)
          })
      }, [])


  useEffect(() => {
    dispatch(liste_des_reçus_payer(user?._id)).then((action) => {setReçus_payer(action.payload.reçu) })
  }, [user])

  useEffect(() => {
    dispatch(rechercher_reçu_deposant(user?._id)).then((action) => { setReçus_deposer(action.payload.reçu) })
  }, [user])


  

  return (

    <div>
      <Accueil></Accueil>

      <Liste_des_reçus_deposer user={user} reçus_deposer={reçus_deposer}/>

      <Liste_des_reçus_verser user={user} reçus_payer={reçus_payer}/>


      




    </div>

  )
}

