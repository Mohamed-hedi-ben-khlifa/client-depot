import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'

const Connexion = () => {


    const dispatch = useDispatch()
    const [valid, setvalid] = useState(true)
    const [message, setMessage] = useState()
    const [user, setUser] = useState({
        email: "",
        pasword: "",
    })

    const handleChange = e => {
        setvalid(true)
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const connexion = () => {

        dispatch(auth(user)).then(action => {
          console.log(action)
            if (action.payload.success && action.payload.user.role === "deposant") {
                console.log(action)
                localStorage.setItem("token", action.payload.token)
                const myTimeout = setTimeout(window.location.reload(), 2000);
              
                
                
            }else{
                setvalid(false)
                setMessage(action.payload.message)

            }
        })
    }


  return (
    <div style={{ marginTop: '-1%' }}>


      <div className="page-header min-vh-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
              <div className="card " style={{ backgroundColor: 'transparent' }}>
                <div className="card-header pb-0 text-start" style={{ backgroundColor: 'transparent' }}>
                  <h3 className="font-weight-bolder text-center">S'identifier</h3>
                  <p className="mb-0 mt-4 text-center">Entrez votre email et votre mot de passe </p>
                </div>
                <div className="card-body">

                  <div className="input-group input-group-dynamic  ">
                    <input type="email" className="form-control input-group-dynamic " placeholder="Email" aria-label="Email" name="email" value={user.email} onChange={handleChange} />
                  </div>
                  <div className="input-group input-group-dynamic my-3 mb-3">
                    <input type="password" className="form-control input-group-dynamic " placeholder="Password" aria-label="Password" name="pasword" value={user.pasword} onChange={handleChange} />
                  </div>
                  {!valid ? <p className='text-primary text-start text-xs'> {message} </p> : <p></p>}
                  <div className="text-center">
                    <button type="button" className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0" onClick={() => connexion()}>S'identifier</button>
                  </div>

                </div>
                <div className="card-footer text-center pt-0 px-lg-2 px-1">
                  <p className="mb-4 text-sm mx-auto">
                    Vous n'avez pas de compte ?
                    <a type="button" className="text-primary text-gradient font-weight-bold"> Inscrivez-vous</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">


              <img src="../assets/img/ivanciks.jpg" alt="pattern-lines" className="img-responsive " style={{ height: '100%' }} />

            </div>

          </div>
        </div>
      </div>





    </div>

  )
}



export default Connexion 