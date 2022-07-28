import React, { useEffect, useState, useContext } from 'react'
import { SocketContext } from '../../context/socket';
import { useDispatch } from 'react-redux'
import { vuNotifications, recherche_notification_deposant, liste_des_notifications_de_deposant_non_vu } from '../../store/notificationSlice'
import { Link } from 'react-router-dom';
import { rechercher_user_par_token } from '../../store/userSlice'

export default function Notification(props) {



    const dispatch = useDispatch()
    const [count, setCount] = useState(0)
    const [notification, setNotification] = useState([])
    const [user, setUser] = useState()
    const token = localStorage.getItem("token")
  
      useEffect(() => {
          if (token !== null)
            dispatch(rechercher_user_par_token()).then(action => {
              setUser(action.payload.user)
            })
        }, [])


    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on("mettre_a_jour_liste_des_notifications", () => {

            dispatch(liste_des_notifications_de_deposant_non_vu(user?._id)).then(action => { setNotification(action.payload.notification) })
            dispatch(liste_des_notifications_de_deposant_non_vu(user?._id)).then(action => { setCount(action.payload.notification.length) })
        });
    }, [socket,user])


    useEffect(() => {


        dispatch(liste_des_notifications_de_deposant_non_vu(user?._id)).then(action => {
            setNotification(action.payload.notification)
     
        })


    }, [user])

    useEffect(() => {

        dispatch(liste_des_notifications_de_deposant_non_vu(user?._id)).then(action => { setCount(action.payload.notification.length) })

    }, [notification])





    const vu_notification = (notification) => {

        dispatch(vuNotifications(notification._id))
        socket.emit("vu_notification")
        dispatch(recherche_notification_deposant(user?._id)).then(action => {
            setNotification(action.payload.notification)

        })

        dispatch(liste_des_notifications_de_deposant_non_vu(user?._id)).then(action => {
            setCount(action.payload.notification.length)
        })

    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('/');
    }


    function formatTime(date) {
        var d = new Date(date),

            h = d.getHours(),
            m = d.getMinutes(),
            s = d.getSeconds();



        return [h, m].join(':');
    }


    return (
        <div>
            <div className="row  ">

                <div className="col-12 ">
                    <div className="d-flex px-2 py-1">

                        <div className="dropdown ">
                            <a href='#' className="d-flex flex-column justify-content-end  " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <span><i className="material-icons text-dark m-2 mt-0 mb-0  " style={{ fontSize: "1.7rem" }}>notifications</i></span>
                                {count > 0 ? <span className="position-absolute top-5  start-100 translate-middle badge rounded-pill bg-danger border border-white small py-1 px-2 w-50 h-20" style={{ marginLeft: '-80%' }}>
                                    <span className="small">{count}</span>
                                    <span className="visually-hidden">unread notifications</span>
                                </span>
                                    : <span></span>}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4 " aria-labelledby="dropdownMenuButton"  >

                                {count > 0 ? notification.map((notification, index) =>






                                    <div key={index}>

                                      

                                            <div>

                                                {notification.body === "Article impayée" ?
                                                    <li className="mb-2" style={{ backgroundColor: notification.status === "Vu" ? 'rgba(240, 240, 240, 0)' : 'rgba(240, 240, 240, 1)', width: '560px' }} >

                                                        <Link to={'/deposant/notifications'} className="dropdown-item border-radius-md" onClick={() => vu_notification(notification)}  >
                                                            <div className="row">
                                                                <div className="col-2" style={{ maxWidth: '60px' }}>
                                                                    <img src="../../../assets/img/team-2.jpg" className="avatar avatar-sm  me-3 " alt="user image" />
                                                                </div>
                                                                <div className="col-8 ">
                                                                    <h6 className="text-sm font-weight-normal mb-1">

                                                                        <span className="font-weight-bold">Vous avez un produit qui a été vendu </span>

                                                                    </h6>
                                                                    <p className="text-xs text-secondary mb-0">
                                                                        <span className="font-weight-bold">Article : </span>   {notification.article.lib ? notification.article.lib : "   ----------   "},
                                                                        <span className="font-weight-bold">  Montant : </span>   {(notification.article.montant_reverser)?.toFixed(3)} $                                                                    </p>
                                                                </div>
                                                                <div className="col-1 " style={{ marginLeft: '6%' }}>
                                                                    <h6 className="text-sm font-weight-bold opacity-9 text-center mb-1">
                                                                        <span className="">{formatDate(notification.date_creation)}</span>


                                                                    </h6>
                                                                    <p className="text-xs text-secondary text-center mb-0 m-4 mt-0" >
                                                                        <span className="font-weight-bold" >{formatTime(notification.date_creation)} </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Link>

                                                    </li>
                                                    : <div></div>
                                                }


                                                {notification.body === "Vous avez un Rendez_vous" ?
                                                    <li className="mb-2" style={{ backgroundColor: notification.status === "Vu" ? 'rgba(240, 240, 240, 0)' : 'rgba(240, 240, 240,1)', width: '560px' }}>
                                                        <Link to={'/deposant/notifications'} className="dropdown-item border-radius-md" onClick={() => vu_notification(notification)}  >
                                                            <div className="row">
                                                                <div className="col-2" style={{ maxWidth: '60px' }}>
                                                                    <img src="../../../assets/img/team-2.jpg" className="avatar avatar-sm  me-3 " alt="user image" />
                                                                </div>
                                                                <div className="col-10 ">
                                                                    <h6 className="text-sm font-weight-normal mb-1">

                                                                        <span className="font-weight-bold">Votre article est accepter</span>, Vous avez un Rendez_vous  le
                                                                        <span className="font-weight-bold"> {formatDate(notification.date_rendez_vous)} </span>, à
                                                                        <span className="font-weight-bold"> {formatTime(notification.date_rendez_vous)} </span>

                                                                    </h6>

                                                                    <p className="text-xs text-secondary mb-0">
                                                                        <span className="font-weight-bold">Article : </span>   {notification.article.lib ? notification.article.lib : "   ----------   "},
                                                                        <span className="font-weight-bold">  Montant : </span>   {(notification.article.montant_reverser)?.toFixed(3)} $
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Link>

                                                    </li>
                                                    : <div></div>
                                                }

                                                {notification.body === "Vorte article est refuser" ?
                                                    <li className="mb-2" style={{ backgroundColor: notification.status === "Vu" ? 'rgba(240, 240, 240, 0)' : 'rgba(240, 240, 240,1)', width: '560px' }}>
                                                        <Link to={'/deposant/notifications'} className="dropdown-item border-radius-md" onClick={() => vu_notification(notification)}  >
                                                            <div className="row">
                                                                <div className="col-2" style={{ maxWidth: '60px' }}>
                                                                    <img src="../../../assets/img/team-2.jpg" className="avatar avatar-sm  me-3 " alt="user image" />
                                                                </div>
                                                                <div className="col-8 ">
                                                                    <h6 className="text-sm font-weight-normal mb-1">

                                                                        <span className="font-weight-bold">Vorte article est refuser</span>

                                                                    </h6>
                                                                    <p className="text-xs text-secondary mb-0">
                                                                        <span className="font-weight-bold">Article : </span>   {notification.article.lib ? notification.article.lib : "   ----------   "},
                                                                        <span className="font-weight-bold">  Montant : </span>   {(notification.article.montant_reverser)?.toFixed(3)} $
                                                                    </p>
                                                                </div>
                                                                <div className="col-1 " style={{ marginLeft: '6%' }}>
                                                                    <h6 className="text-sm font-weight-bold opacity-9 text-center mb-1">
                                                                        <span className="">{formatDate(notification.date_creation)}</span>


                                                                    </h6>
                                                                    <p className="text-xs text-secondary text-center mb-0 m-4 mt-0" >
                                                                        <span className="font-weight-bold" >{formatTime(notification.date_creation)} </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Link>

                                                    </li>
                                                    : <div></div>
                                                }



                                            </div>
                                       


                                    </div>

                                ) : <li className="mb-2 opacity-10 text-center" style={{ width: '460px' }}>

                                    <div className="col-12 ">
                                        <h6 className="text-sm font-weight-normal mb-1 text-center">

                                            <span className="font-weight-bold text-center">Aucune notification</span>

                                        </h6>

                                    </div>

                                </li>}
                            </ul>
                        </div>

                    </div>
                </div>

            </div>


        </div>
    )


}
