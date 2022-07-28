import { SocketContext } from '../../context/socket';
import { Link, useNavigate } from 'react-router-dom'
import Notification from './Notification';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rechercher_user_par_token } from '../../store/userSlice'


function NavBar(props) {

  const { boutique } = useSelector((state) => state.boutique)
  const socket = useContext(SocketContext);
  let navigate = useNavigate();
  const [user, setUser] = useState({image:{}})
  const token = localStorage.getItem("token")
  const dispatch = useDispatch()

    useEffect(() => {
        if (token !== null)
          dispatch(rechercher_user_par_token()).then(action => {
            setUser(action.payload.user)
          })
      }, [])

  const logOut = () => {


    localStorage.removeItem('token')
    socket.emit("disconnected")
    return navigate('/connexion', { replace: true })

  }




  return (
    <div>
      <nav className="navbar  navbar-expand-lg   px-0 mx-4 mt-0 border-radius-xl z-index-sticky blur opacity-9   " style={{ position: 'fixed', width: '80%', left: '9%' }}>

        <Link to={'/deposant/articles'} style={{ maxWidth: "10%" }} >
        <img src={boutique?.logo ?process.env.REACT_APP_BASE_URL+"/"+ boutique?.logo: '../../../assets/img/logo-ct-dark.png'  } alt="main_logo" style={{ marginRight: "2%", width: '14%', height: '14%', marginTop: '-2%' }} />

          <span className=" font-weight-bold " style={{ color: "#111", fontFamily: 'Indie Flower', fontweight: '700', fontSize: "120%", marginTop: '10px' }}>{boutique?.nom} </span>
        </Link>


        <ul className="pro nav justify-content-center " style={{ marginLeft: "30%" }}>
          <li className="nav-item">
            <Link to={'/deposant/articles'} className="nav-link " href="#">Articles</Link>
          </li>
          <li className="nav-item">
            <Link to={'/deposant/recus'} className="nav-link " href="#">Reçus</Link>
          </li>
          <li className="nav-item">
            <Link to={'/deposant/notifications'} className="nav-link " href="#">Notifications</Link>
          </li>



        </ul>





        <span className="text-end " style={{ marginLeft: "22%" }}>
          <Notification user={user} />
        </span>


        <div className="dropdown ">
          <a href='#' className="d-flex flex-column justify-content-end  " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <span >

              <div className="d-flex px-2 py-1">
                <div style={{ marginLeft: "-6%" }}>
                  <div className="avatar avatar-xs rounded-circle me-2" data-bs-placement="bottom" >
                    {
                      user.image ?
                        <img src={process.env.REACT_APP_BASE_URL + "/" + user.image} alt="team5" />
                        : <img src="../assets/img/marie.jpg" alt="team5" />
                    }

                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center" style={{ marginTop: '-4%' }}>
                  <h6 className="mb-0 text-sm ">{user.prenom + " " + user.nom}</h6>
                </div>
              </div>
            </span>
          </a>
          <ul className="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4 " aria-labelledby="dropdownMenuButton"  >

            <li className="mb-2"  >
              <Link to={'/deposant/profile'}>
                <div className="row">
                  <div className="col-2" style={{ maxWidth: '60px', marginLeft: '2%' }}>
                    <i className="material-icons opacity-10">person</i>
                  </div>
                  <div className="col-9 ">
                    <h6 className="text-sm font-weight-normal mb-1">
                      <span className="font-weight-bold">Profile</span>
                    </h6>
                  </div>
                </div>
              </Link>
            </li>

            <li className="mb-2"  >
              <a type="button" onClick={() => logOut()} >
                <div className="row">
                  <div className="col-2" style={{ maxWidth: '60px', marginLeft: '2%' }}>
                    <i className="material-icons opacity-10">logout</i>
                  </div>
                  <div className="col-9 ">
                    <h6 className="text-sm font-weight-normal mb-1">
                      <span className="font-weight-bold">Deconnexion</span>
                    </h6>
                  </div>
                </div>
              </a>
            </li>


          </ul>
        </div>

      </nav>



    </div>

  )
}

export default NavBar


