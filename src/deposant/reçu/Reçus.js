import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Liste_des_reçus_verser from '../reçu/component/Liste_des_reçus_verser'
import Liste_des_reçus_deposer from '../reçu/component/Liste_des_reçus_deposer'

import { rechercher_reçu_deposant ,liste_des_reçus_payer} from '../../store/reçuSlice'
import Accueil from '../accueil/Accueil'




export default function Reçus() {


  const dispatch = useDispatch()
  const [deposant] = useState(JSON.parse( localStorage.getItem('user')))
  const [reçus_deposer, setReçus_deposer] = useState([])
  const [reçus_payer, setReçus_payer] = useState([])

  useEffect(() => {
    dispatch(liste_des_reçus_payer(deposant._id)).then((action) => {setReçus_payer(action.payload.reçu) })
  }, [])

  useEffect(() => {
    dispatch(rechercher_reçu_deposant(deposant._id)).then((action) => { setReçus_deposer(action.payload.reçu) })
  }, [])


  

  return (

    <div>
      <Accueil></Accueil>

      <Liste_des_reçus_deposer deposant={deposant} reçus_deposer={reçus_deposer}/>

      <Liste_des_reçus_verser deposant={deposant} reçus_payer={reçus_payer}/>


      




    </div>

  )
}

