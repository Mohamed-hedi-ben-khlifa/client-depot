import { SocketContext } from '../../context/socket';
import { Link, useNavigate } from 'react-router-dom'
import Notification from './Notification';
import { useContext } from 'react';
import { useSelector } from 'react-redux';



function NavBar(props) {

  const { boutique } = useSelector((state) => state.boutique)
  const socket = useContext(SocketContext);
  let navigate = useNavigate();

  const logOut = () => {


    localStorage.removeItem('user')
    props.setUser(null)
    socket.emit("disconnected")
    return navigate('/connexion', { replace: true })

  }

 


  return (
    <div>
      <nav className="navbar  navbar-expand-lg   px-0 mx-4 mt-0 border-radius-xl z-index-sticky blur opacity-9   " style={{ position: 'fixed', width: '80%', left: '9%' }}>

        <Link to={'/deposant/articles'} style={{maxWidth:"10%"}} >
          <img src={boutique?.logo}  alt="main_logo" style={{ marginRight: "2%",width:'14%', height:'14%'  , marginTop:'-2%'}} />

          <span className=" font-weight-bold " style={{ color: "#111", fontFamily: 'Indie Flower', fontweight: '700', fontSize: "120%" , marginTop:'10px'}}>{boutique?.nom} </span>
        </Link>


        <ul className="pro nav justify-content-center " style={{ marginLeft: "34%" }}>
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
          <Notification user={props.user} />
        </span>


        <div className="dropdown ">
          <a href='#' className="d-flex flex-column justify-content-end  " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <span >

              <div className="d-flex px-2 py-1">
                <div style={{ marginLeft: "-6%" }}>
                  <div className="avatar avatar-xs rounded-circle me-2" data-bs-placement="bottom" >
                    <img src={props.user.image ? props.user.image : "../assets/img/team-2.jpg"} alt="team5" />
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center" style={{ marginTop: '-4%' }}>
                  <h6 className="mb-0 text-sm ">{props.user.prenom + " " + props.user.nom}</h6>
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


