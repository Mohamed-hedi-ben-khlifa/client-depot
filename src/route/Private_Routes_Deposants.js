import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../deposant/component/NavBar'
import Footer from '../deposant/component/Footer'
import {  information } from '../store/boutiqueSlice';
import { useDispatch } from 'react-redux';
import {  useEffect, useState } from 'react'

export const  Private_Routes_Deposants= (props) => {


    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
    const [boutique, setBoutique] = useState()

    useEffect(() => {
        dispatch(information()).then((action) => {
            setBoutique(action.payload.boutique[0])
        })
    }, [])


    return (

        <div>
          <div className='container-fluid'>
            <div  style={{ width: '80%', marginLeft:"10%"}}>            
              <NavBar  boutique={boutique} user={props.user}/>
                {(token !== null && props.role === 'deposant') ? <Outlet /> : <Navigate to='/connexion' />}
                <Footer />
         
            </div>
          </div>
        </div>
      )
    }

