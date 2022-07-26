import axios from 'axios'
import React, { useContext,useState,useEffect } from 'react'
import { SocketContext } from '../../context/socket';
import { useDispatch } from 'react-redux'
import { liste_des_article_non_verser, nombre_total_article_deposant, nombre_total_article_vendu } from '../../store/articleSlice'
import { rechercher_deposant_par_id, upload_image_deposant } from '../../store/deposantSlice'
import { rechercher_user_par_token } from '../../store/userSlice'




export default function Profile(props) {

    const socket = useContext(SocketContext);
    const dispatch = useDispatch()
    const [user, setUser] = useState()
    const token = localStorage.getItem("token")
  
      useEffect(() => {
          if (token !== null)
            dispatch(rechercher_user_par_token()).then(action => {
              setUser(action.payload.user)
            })
        }, [])

    const[ deposant,setDeposant] = useState(user)
    useEffect(() => {
        dispatch( rechercher_deposant_par_id(user?._id)).then((action)=> {
            setDeposant(action.payload.deposant)
        })
    },[])

    useEffect(() => {
        socket.on("mettre_a_jour_photo_de_profile",()=> {
            dispatch( rechercher_deposant_par_id(user?._id)).then((action)=> {
                setDeposant(action.payload.deposant)
            })      })
    }, [socket])



    const [nombre_article_deposer, setNombre_article_deposer] = useState(0)
    const [nombre_article_vendu, setNombre_article_vendu] = useState(0)

    const [total_non_verser, setTotal_non_verser] = useState(0)
    const [total, setTotal] = useState(0)





    useEffect(() => {
        dispatch(liste_des_article_non_verser(user?._id)).then((action) => {
            setTotal_non_verser(action.payload.article?.map(article => article.montant_reverser).reduce((prev, curr) => prev + curr, 0))
        })
    }, [dispatch, user])

    useEffect(() => {
        dispatch(nombre_total_article_deposant(user?._id)).then((action) => setNombre_article_deposer(action.payload.article.length))
    }, [, dispatch])

    useEffect(() => {
        dispatch(nombre_total_article_vendu(user?._id)).then((action) => {
            setNombre_article_vendu(action.payload.article.length)

        })
    }, [, dispatch])

    useEffect(() => {
        dispatch(nombre_total_article_deposant(user?._id)).then((action) => {

            setTotal(action.payload.article?.map(article => article.montant_reverser).reduce((prev, curr) => prev + curr, 0))
        })
    }, [, dispatch])




    const fileChange = e => {

        const image = new FormData() 
        image.append('image', e.target.files[0])
        const params={
          id:props.user?._id,
          image:image
        }
        
        dispatch(upload_image_deposant(params)).then((action) => {
          socket.emit("mettre_a_jour_photo_de_profile")
          dispatch(rechercher_user_par_token()).then(action => {
            setUser(action.payload.user)
          })
        })
      }



    return (
        <div>

            <div className="container-fluid py-4" >
                <div className="row" style={{marginTop:'4%', width:'103%' , marginLeft:'-1%'}}>
                <div className='card  mb-4'  style={{backgroundColor:'rgba(255,255,255,0.4)'}}>
                    <div className="section about-section " id="about">
                        <div className="container">
                            <div className="row align-items-start flex-row-reverse">
                                <div className="col-lg-8">
                                    <div className="about-text go-to">
                                        <h3 className="dark-color text-start " style={{ marginLeft: '8%' }}>Profile </h3>
                                        <div className="row about-list text-start">
                                            <div className="col-md-1"></div>
                                            <div className="col-md-5">
                                                <div className="media">
                                                    <label className="h5 w-40">Nom</label>
                                                    <p className='h6'>{user?.nom ? user?.nom : "Foulaine"}</p>
                                                </div>
                                                <div className="media">
                                                    <label className="h5 w-40">Prénom </label>
                                                    <p className='h6'>{user?.prenom ? user?.prenom : "Ben Foulaine"}</p>
                                                </div>
                                                <div className="media">
                                                    <label className="h5 w-40">Address</label>
                                                    <p className='h6'>{user?.adress ? user?.adress : "Rue ******, ***** "}</p>
                                                </div>
                                                <div className="media">
                                                    <label className="h5 w-40">Code postal</label>
                                                    <p className='h6'>{user?.codepostal ? user?.codepostal : "***"}</p>
                                                </div>
                                            </div>
                                            <div className="col-5">
                                                <div className="media">
                                                    <label className="h5 w-40">C.I.N</label>
                                                    <p className='h6'>{user?.cin ? user?.cin : "123*****"}</p>
                                                </div>
                                                <div className="media">
                                                    <label className="h5 w-40">Email</label>
                                                    <p className='h6'>{user?.emai ? user?.email : "exemple@mail.com"}</p>
                                                </div>
                                                <div className="media">
                                                    <label className="h5 w-40">Telephone</label>
                                                    <p className='h6'>{user?.telephone ? user?.telephone : "+216 ** *** ***"}</p>
                                                </div>
                                                <div className="media">
                                                    <label className="h5 w-40">Date N</label>
                                                    <p className='h6'>{user?.dateN ? user?.dateN : "**/**/****"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="about-avatar"  >
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#profile" >
                                            {
                                                user?.image ?
                                                    <img className="w-100 min-height-400 max-height-400 " src={process.env.REACT_APP_BASE_URL+"/"+user?.image} />
                                                    :
                                                    <img className="w-100 min-height-400 max-height-400 " src="../../assets/img/s.jpg" />
                                            }
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="counter">
                                <div className="row">
                                    <div className="col-6 col-lg-3">
                                        <div className="count-data text-center">
                                            <h6 className="count h2" data-to={500} data-speed={500}>{nombre_article_deposer}</h6>
                                            <p className="m-0px font-w-600">Article déposer </p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div className="count-data text-center">
                                            <h6 className="count h2" data-to={150} data-speed={150}>{nombre_article_vendu}</h6>
                                            <p className="m-0px font-w-600">Article vendu</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div className="count-data text-center">
                                            <h6 className="count h2" data-to={850} data-speed={850}>{(total_non_verser)?.toFixed(3)}  $ </h6>
                                            <p className="m-0px font-w-600">Total non versé </p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div className="count-data text-center">
                                            <h6 className="count h2" data-to={190} data-speed={190}> {(total)?.toFixed(3)}  $</h6>
                                            <p className="m-0px font-w-600">Total </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>


            <div className="modal fade" id="profile" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog modal-dialog-centered">
                    <div className="modal-content">



                        <div className="modal-body">

                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">

                                    <a aria-label="Close">
                                        <h6 >Telecharger un photo depuis ce pc  </h6>
                                    </a>
                                    <input type="file" className="form-control-file" id="exampleFormControlFile1" style={{ display: 'none' }} data-bs-dismiss="modal" onChange={fileChange} />
                                </label>
                            </div>

                        </div>

                    </div>
                </div>
            </div>





        </div>
    )

}
