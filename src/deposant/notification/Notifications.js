import React, { useEffect, useState, useContext } from 'react'
import { SocketContext } from '../../context/socket';
import { useDispatch } from 'react-redux'
import Barcode from 'react-barcode'
import { recherche_article_par_id } from '../../store/articleSlice';
import { vuNotifications, recherche_notification_deposant } from '../../store/notificationSlice'
import Accueil from '../accueil/Accueil';
import { rechercher_user_par_token } from '../../store/userSlice'

export default function Notifications(props) {


  const dispatch = useDispatch()

  const [notifications, setNotification] = useState([])
  const [article, setArticle] = useState({
    _id: "article_id",
    description: null,
    lib: null,
    etat: null,
    prix_vente_ttc: null,
    prix_achat: null,
    montant_reverser: null,
    date_vente: null,
    date_reversement: null,
    date_depot: null,
    status_reversement: null,
    status_acceptation: null,
    status_vendu: null,
    image: []
  })

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

      dispatch(recherche_notification_deposant(user?._id)).then(action => { setNotification(action.payload.notification) })
    });

  }, [socket])


  useEffect(() => {
    dispatch(recherche_notification_deposant(user?._id)).then(action => {
      setNotification(action.payload.notification)

    })

  }, [user])






  const vu = (notification) => {

    socket.emit("vu_notification")
    dispatch(vuNotifications(notification._id))
    dispatch(recherche_notification_deposant(user?._id)).then(action => {
      setNotification(action.payload.notification)
    })
    dispatch(recherche_notification_deposant(user?._id)).then(action => {
      setNotification(action.payload.notification)
    })
    dispatch(recherche_article_par_id(notification.article._id)).then(action => {
      setArticle(action.payload.article[0]);
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

    return [year, month, day].join('/');
  }

  function formatTime(date) {
    var d = new Date(date),

      h = d.getHours(),
      m = d.getMinutes()



    return [h, m].join(':');
  }







  return (
    <div>

      <Accueil></Accueil>
      <div className="">
        <div className="card text-start ">
          <div className="card-header pb-0">
            <div className="row  mb-4">
              <div className="col-lg-2 col-7">
                <h4>List Des Notifications</h4>
              </div>
              <div className="col-lg-1 col-7"></div>


            </div>

          </div>
        </div>
        <div className="card mt-4" >
          <div className="card-body px-0 p-4  m-4 mt-0">
            <div className="" style={{ marginLeft: '20%', width: '60%' }}>


              {notifications?.map((notification, index) =>

                <div key={index}>

                  <div>


                    {
                      notification.body === "Vous avez un Rendez_vous" ?
                        <div className="card  text-start mt-4 p-2" style={{ backgroundColor: notification.status === "Vu" ? 'rgba(240, 240, 240, 0)' : 'rgba(240, 240, 240, 0.8)' }}>

                          <div className='row' id="notification">
                            <div className='col-12' >
                              <a className="dropdown-item border-radius-md" type="button" href="#notification" onClick={() => { vu(notification) }} data-bs-toggle="modal" data-bs-target="#article">
                                <div className="row">
                                  <div className="col-2 justify-content-center" style={{ maxWidth: '60px' }}>
                                    <img src="../../../assets/img/team-2.jpg" className="avatar avatar-sm  me-3 " alt="user? image" />
                                  </div>
                                  <div className="col-9 ">
                                    <h6 className="text-sm font-weight-normal mb-1">
                                      <span className="font-weight-bold">Votre article est accepter</span>, Vous avez un Rendez_vous  le
                                      <span className="font-weight-bold"> {formatDate(notification.date_rendez_vous)} </span>, à
                                      <span className="font-weight-bold"> {formatTime(notification.date_rendez_vous)} </span>

                                    </h6>
                                    <p className="text-xs text-secondary mb-0">
                                      <span className="font-weight-bold">Date: </span>{formatDate(notification.date_creation)}, <span className="font-weight-bold">Article : </span>   {(notification.article.lib)}
                                    </p>
                                  </div>
                                  <div className="col-1 " style={{ marginLeft: '6%' }}>
                                    <h6 className="text-sm font-weight-normal text-center mb-1">
                                      <span className="">{formatDate(notification.date_creation)}</span>


                                    </h6>
                                    <p className="text-xs text-secondary text-center mb-0 m-3 mt-0" >
                                      <span className="font-weight-bold" >{formatTime(notification.date_creation)} </span>
                                    </p>
                                  </div>

                                </div>
                              </a>
                            </div>


                          </div>
                        </div>

                        : <div></div>
                    }

                    {
                      notification.body === "Vorte article est refuser" ?
                        <div className="card  text-start mt-4 p-2" style={{ backgroundColor: notification.status === "Vu" ? 'rgba(240, 240, 240, 0)' : 'rgba(240, 240, 240, 0.8)' }}>

                          <div className='row' id="notification">
                            <div className='col-12' >
                              <a className="dropdown-item border-radius-md" type="button" href="#notification" onClick={() => { vu(notification) }} data-bs-toggle="modal" data-bs-target="#article">
                                <div className="row">
                                  <div className="col-2 justify-content-center" style={{ maxWidth: '60px' }}>
                                    <img src="../../../assets/img/team-2.jpg" className="avatar avatar-sm  me-3 " alt="user image" />
                                  </div>
                                  <div className="col-9 ">
                                    <h6 className="text-sm font-weight-normal mb-1">
                                      <span className="font-weight-bold">Vorte article est refuser</span>


                                    </h6>
                                    <p className="text-xs text-secondary mb-0">
                                      <span className="font-weight-bold">Article : </span>   {notification.article.lib ? notification.article.lib : "   ----------   "},
                                      <span className="font-weight-bold">  Montant : </span>   {(notification.article.montant_reverser)?.toFixed(3)} $
                                    </p>
                                  </div>
                                  <div className="col-1 " style={{ marginLeft: '6%' }}>
                                    <h6 className="text-sm font-weight-normal text-center mb-1">
                                      <span className="">{formatDate(notification.date_creation)}</span>


                                    </h6>
                                    <p className="text-xs text-secondary text-center mb-0 m-3 mt-0" >
                                      <span className="font-weight-bold" >{formatTime(notification.date_creation)} </span>
                                    </p>
                                  </div>

                                </div>
                              </a>
                            </div>


                          </div>
                        </div>

                        : <div></div>
                    }

                    {
                      notification.body === "Article impayée" ?
                        <div className="card  text-start mt-4 p-2" style={{ backgroundColor: notification.status === "Vu" ? 'rgba(240, 240, 240, 0)' : 'rgba(240, 240, 240, 0.8)' }}>

                          <div className='row' id="notification">
                            <div className='col-12' >
                              <a className="dropdown-item border-radius-md" type="button" href="#notification" onClick={() => vu(notification)} data-bs-toggle="modal" data-bs-target="#article">
                                <div className="row">
                                  <div className="col-2 justify-content-center" style={{ maxWidth: '60px' }}>
                                    <img src="../../../assets/img/team-2.jpg" className="avatar avatar-sm  me-3 " alt="user image" />
                                  </div>
                                  <div className="col-9 ">
                                    <h6 className="text-sm font-weight-normal mb-1">
                                      <span className="font-weight-bold">Vous avez un produit qui a été vendu </span>


                                    </h6>
                                    <p className="text-xs text-secondary mb-0">
                                      <span className="font-weight-bold">Article: </span>{notification.article.lib ? notification.article.lib : "   ----------   "}, <span className="font-weight-bold">Montant : </span>   {(notification.article.montant_reverser)?.toFixed(3)} $
                                    </p>
                                  </div>
                                  <div className="col-1 " style={{ marginLeft: '6%' }}>
                                    <h6 className="text-sm font-weight-normal text-center mb-1">
                                      <span className="">{formatDate(notification.date_creation)}</span>


                                    </h6>
                                    <p className="text-xs text-secondary text-center mb-0 m-3 mt-0" >
                                      <span className="font-weight-bold" >{formatTime(notification.date_creation)} </span>
                                    </p>
                                  </div>

                                </div>
                              </a>
                            </div>


                          </div>
                        </div>

                        : <div></div>
                    }




                  </div>

                </div>
              )}




            </div>
          </div>
        </div>  </div>


      <div className="modal fade" id="article" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true"  >
        <div className="modal-dialog modal-dialog-centered modal-xl" >
          <div className="modal-content" style={{ height: "280px" }}>
            <div className="modal-body" >
              <div className="container" style={{ marginBottom: '-9%', marginTop: '-3%', }}>
                <div className="row flex-row">
                  <div className="col-lg-5">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#profile" >

                      <img
                        className="w-60 min-height-250 max-height-250   border-radius-lg ms-2"
                        data-size="500x600"
                        src={article?.image?.length > 0 ? "http://localhost:4040/" + article?.image[0]?.filename : "../../assets/img/image.png"}
                        style={{ padding: article?.image?.length > 0 ? ' 0%  ' : ' 12%', background: article?.image?.length > 0 ? '#transparent' : '#F5F5F5', marginTop: '-10%' }}
                      />

                    </a>
                    <div className="my-gallery d-flex mt-4 " itemScope itemType="http://schema.org/ImageGallery" data-pswp-uid={1} style={{ marginLeft: '8%' }}>

                      <figure style={{ marginLeft: '5%' }}>
                        <a href="../assets/img/examples/product3.png" >

                          <img
                            className="w-100 min-height-100 max-height-100 border-radius-lg "
                            src={article?.image?.length > 1 ? "http://localhost:4040/" + article?.image[1]?.filename : "../../assets/img/image.png"}
                            alt="Image description"
                            loading="lazy"
                            style={{ padding: article?.image?.length > 1 ? ' 0%  ' : ' 20%', background: article?.image?.length > 1 ? '#transparent' : '#F5F5F5' }}
                          />


                        </a>
                      </figure>


                      <figure className="ms-3  " itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                        <a href="../assets/img/examples/product4.jpg" itemProp="contentUrl" data-size="500x600">

                          <img
                            className="w-100 min-height-100 max-height-100 border-radius-lg "
                            src={article?.image?.length > 2 ? "http://localhost:4040/" + article?.image[2]?.filename : "../../assets/img/image.png"}
                            alt="Image description"
                            loading="lazy"
                            style={{ padding: article?.image?.length > 2 ? ' 0%  ' : ' 20%', background: article?.image?.length > 2 ? '#transparent' : '#F5F5F5' }}
                          />
                        </a>
                      </figure>
                      <figure className="ms-3  " itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                        <a href="../assets/img/examples/product4.jpg" itemProp="contentUrl" data-size="500x600">

                          <img
                            className="w-100 min-height-100 max-height-100 border-radius-lg "
                            src={article?.image?.length > 3 ? "http://localhost:4040/" + article?.image[3]?.filename : "../../assets/img/image.png"}
                            alt="Image description"
                            loading="lazy"
                            style={{ padding: article?.image?.length > 3 ? ' 0%  ' : ' 20%', background: article?.image?.length > 3 ? '#transparent' : '#F5F5F5' }}
                          />
                        </a>
                      </figure>


                    </div>

                  </div>
                  <div className="col-lg-7">
                    <div className="about-text go-to">

                      <div className="row">
                        <div className="col-9">

                          {article?.lib !== null ? <h3 className="dark-color text-start " style={{ marginTop: '10%' }}>{article?.lib} </h3> 
                                                 : <h3 className="dark-color text-start " style={{ marginTop: '10%' }}>article</h3>}
                        </div>

                      </div>





                      <div className="row about-list text-start">
                        <div className="text-start" >
                          {article?.etat === "Neuf" ? <span className="badge bg-gradient-primary ">{article?.etat}</span> : <span></span>}
                          {article?.etat === "Bon etat" ? <span className="badge bg-gradient-success ">{article?.etat}</span> : <span></span>}
                          {article?.etat === "Passable" ? <span className="badge bg-gradient-dark " >{article?.etat}</span> : <span></span>}
                          {article?.etat === "" ? <span className="badge  " style={{ backgroundColor: '#A1A1A1' }}>-------</span> : <span></span>}
                        </div>



                        <div className="col-md-3">

                          <div className="" style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>
                            <span>
                              Réfeerence:
                            </span>
                            <span className="" style={{ fontWeight: '500', marginLeft: '10%', opacity: '70%' }}>
                              {article?.ref}
                            </span>
                          </div>



                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-3 ">


                          <div style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>
                            <span style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>Prix:   </span>
                            <span style={{ fontWeight: '500', marginLeft: '10%', opacity: '70%' }}>
                              $  {article?.montant_reverser !== null ? (article?.montant_reverser)?.toFixed(3) : '0.000'}
                            </span>
                          </div>

                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-4 ">
                          <div style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>
                            <span style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>Date: </span>


                            <span style={{ fontWeight: '500', marginLeft: '10%', opacity: '70%' }}>
                              {article.date_depot !== null ? formatDate(article.date_depot) : "--/--/--"}

                            </span>

                          </div>




                        </div>
                      </div>
                    </div>


                    <div  >
                      <Barcode value={article?._id} width={1.5} displayValue={false} height={60} marginTop={30} background={'none'} />
                    </div>

                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>

  )

}
