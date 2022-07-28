import React, { useEffect, useState, useContext } from 'react'
import { SocketContext } from '../../context/socket';
import { liste_des_article_de_deposant, recherche_article_par_reference } from '../../store/articleSlice'
import { useDispatch } from 'react-redux'
import Postuler_article from './Postuler_article'
import Barcode from 'react-barcode'
import axios from 'axios'
import Accueil from '../accueil/Accueil'
import { rechercher_user_par_token } from '../../store/userSlice'

export default function Articles(props) {



  const dispatch = useDispatch()
  const [message, setMessage] = useState()
  const [user, setUser] = useState()
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState({
    user_id: user?._id,
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


  const token = localStorage.getItem("token")

    useEffect(() => {
        if (token !== null)
          dispatch(rechercher_user_par_token()).then(action => {
            setUser(action.payload.user)
            dispatch(liste_des_article_de_deposant(action.payload.user._id)).then((action) => {
              setArticles(action.payload.article)
            })
          })
      }, [])


 




  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("mettre_a_jour_liste_des_articles_deposant", () => {
      dispatch(liste_des_article_de_deposant(user?._id)).then((action) => {
        setArticles(action.payload.article)
      })
    })
  }, [socket])

  const handleChange = e => {

    if (e.code === "Enter") { onKeyDown(e) };
  }

  const onKeyDown = async (e) => {

    function myGreeting() {
      setMessage("")
    }

    dispatch(recherche_article_par_reference(e.target.value)).then(async (action) => {
      if (action.payload.article.length > 0) {
        setArticles(action.payload.article)
        setMessage("")

      }
      else {
        dispatch(liste_des_article_de_deposant(user?._id)).then(async (action) => { setArticles(action.payload.article) })
        setTimeout(setMessage("Article n'est pas trouver !"), 1000)
        setTimeout(myGreeting, 5000);


      }
    })

  }



  const fileChange = e => {
    const photos = new FormData()
    const files = e.target.files
    for (let i = 0; i < files.length; i++) {
      photos.append("photos", files[i]);
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.patch(process.env.REACT_APP_BASE_URL+'/api/Article/upload/' + article._id, photos, config).then((data) => {
      dispatch(liste_des_article_de_deposant()).then(action => setArticles(action.payload.article))
      socket.emit("mettre_a_jour_photo_de_profile")
    })


  }
  const modal = (article) => {
    setArticle(article);
  }



  const formatDate = (date) => {
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


  return (
    <div>
      <Accueil user={user}></Accueil>
      <Postuler_article  user={user} setArticles={setArticles} />
      <div>


        <div className="card  mt-4 ">
          <div className="card-header pb-0">
            <div className="row  mb-4">
              <div className="col-lg-3 text-start">
                <h4>List Des Articles</h4>
              </div>

              <div className="col-2">
                <div className="input-group input-group-dynamic ">
                  <input className="form-control" type="text" placeholder="Rechercher article par réference ..." name="ref" onKeyDown={handleChange} />
                </div>

              </div>
              <div className="col-5">
                <p className="text-start text-primary mt-3">{message}</p>

              </div>

            </div>

          </div>
        </div>

        <div className="card p-4 mt-4 ">
          <div className="table">


            <table className="table responsive align-items-end " >
              <thead>
                <tr>
                  <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Ref</th>
                  <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Lib.article</th>
                  <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Etat.article</th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Prix d'achat'</th>


                  <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Statut </th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date dépot article</th>

                  <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"  > vendu ?</th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"  >Prix de vente  </th>
                  <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date vente</th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">versé ?</th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Aregant versé</th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date reversement</th>
                </tr>
              </thead>
              <tbody>
                {articles?.map((article, index) =>
                  <tr key={index}>

                    <td className="align-middle text-center  " >
                      <span className="text-sm text-primary  text-sm  font-weight-bold "> {article.ref}</span>
                    </td>

                    <td className="align-middle text-center"  >
                      <a onClick={() => modal(article)} data-bs-toggle="modal" data-bs-target="#article" type="button">
                        <div className="text-sm  font-weight-bold ">
                          {!article.lib ? <span >Article</span> : <span >{article.lib}</span>}
                        </div>
                      </a>
                    </td>



                    <td className="align-middle text-center text-xs  font-weight-bold" >
                      {article.etat === "Neuf" ? <span className="text-primary ">{article.etat}</span> : <span></span>}
                      {article.etat === "Bon etat" ? <span className="text-success ">{article.etat}</span> : <span></span>}
                      {article.etat === "Passable" ? <span className="text-dark ">{article.etat}</span> : <span></span>}
                      {article.etat === "" ? <span className="text-primary ">--------</span> : <span></span>}
                    </td>
                    <td className="align-middle text-center text-sm  font-weight-bold ">
                      <span className=" text-dark   "> $ {article.prix_achat ? (article.prix_achat).toFixed(3) : "0,000"}</span>
                    </td>
                    <td className="align-middle text-center text-sm  font-weight-bold">
                      {article.status_acceptation === "Accepter" ? <span className="badge badge-sm bg-gradient-success">{article.status_acceptation}</span> : <span></span>}
                      {article.status_acceptation === "Refuser" ? <span className="badge badge-sm bg-gradient-danger">{article.status_acceptation}</span> : <span></span>}
                      {article.status_acceptation === "En attente" ? <span className="badge badge-sm bg-gradient-dark">{article.status_acceptation}</span> : <span></span>}
                      {article.status_acceptation === "Deposer" ? <span className=" text-danger"> -------</span> : <span></span>}
                      {article.status_acceptation == null ? <span className=" text-danger"> -------</span> : <span></span>}

                    </td>
                    <td className="align-middle text-center text-sm  font-weight-bold">
                      {article.date_depot === null ? <span className="text-primary ">----/--/--</span> : <span></span>}
                      {article.date_depot !== null ? <span className=" ">{formatDate(article.date_depot)}</span> : <span></span>}
                    </td>



                    <td className="align-middle text-center text-xs  font-weight-bold">

                      {article.status_vendu === "Oui" ? <span className="text-success ">{article.status_vendu}</span> : <span></span>}
                      {article.status_vendu === "Non" ? <span className="text-primary ">{article.status_vendu}</span> : <span></span>}
                    </td>
                    <td className="align-middle text-center text-sm  font-weight-bold">
                      <span className="  text-dark "> $ {article.prix_vente_ttc ? (article.prix_vente_ttc).toFixed(3) : "0,000"}</span>
                    </td>
                    <td className="align-middle text-center text-sm  font-weight-bold">
                      {article.date_vendu === null ? <span className="text-primary ">----/--/--</span> : <span></span>}
                      {article.date_vendu !== null ? <span className=" ">{formatDate(article.date_vendu)}</span> : <span></span>}
                    </td>
                    <td className="align-middle text-center text-xs  font-weight-bold">

                      {article.status_reversement === "Oui" ? <span className="text-success ">{article.status_vendu}</span> : <span></span>}
                      {article.status_reversement === null ? <span className="text-primary ">Non</span> : <span></span>}
                    </td>
                    <td className="align-middle text-center text-dark text-sm  font-weight-bold">
                      <span className=" ">$ {article.montant_reverser ? (article.montant_reverser).toFixed(3) : "0,000"}  </span>
                    </td>
                    <td className="align-middle text-center text-sm  font-weight-bold">
                      {article.date_reversement === null ? <span className="text-primary ">----/--/--</span> : <span></span>}
                      {article.date_reversement !== null ? <span className=" ">{formatDate(article.date_reversement)}</span> : <span></span>}
                    </td>


                  </tr>

                )}
              </tbody>
            </table>
          </div>
        </div>




        <div className="modal fade" id="article" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginLeft: "7%" }} >
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
                          src={article.image.length > 0 ? "http://localhost:4040/" + article.image[0].filename : "../../assets/img/image.png"}
                          style={{ padding: article.image.length > 0 ? ' 0%  ' : ' 12%', background: article.image.length > 0 ? '#transparent' : '#F5F5F5', marginTop: '-10%' }}
                        />

                      </a>
                      <div className="my-gallery d-flex mt-4 " itemScope itemType="http://schema.org/ImageGallery" data-pswp-uid={1} style={{ marginLeft: '8%' }}>

                        <figure style={{ marginLeft: '5%' }}>
                          <a href="../assets/img/examples/product3.png" >

                            <img
                              className="w-100 min-height-100 max-height-100 border-radius-lg "
                              src={article.image.length > 1 ? "http://localhost:4040/" + article.image[1].filename : "../../assets/img/image.png"}
                              alt="Image description"
                              loading="lazy"
                              style={{ padding: article.image.length > 1 ? ' 0%  ' : ' 20%', background: article.image.length > 1 ? '#transparent' : '#F5F5F5' }}
                            />


                          </a>
                        </figure>


                        <figure className="ms-3  " itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                          <a href="../assets/img/examples/product4.jpg" itemProp="contentUrl" data-size="500x600">

                            <img
                              className="w-100 min-height-100 max-height-100 border-radius-lg "
                              src={article.image.length > 2 ? "http://localhost:4040/" + article.image[2].filename : "../../assets/img/image.png"}
                              alt="Image description"
                              loading="lazy"
                              style={{ padding: article.image.length > 2 ? ' 0%  ' : ' 20%', background: article.image.length > 2 ? '#transparent' : '#F5F5F5' }}
                            />
                          </a>
                        </figure>
                        <figure className="ms-3  " itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                          <a href="../assets/img/examples/product4.jpg" itemProp="contentUrl" data-size="500x600">

                            <img
                              className="w-100 min-height-100 max-height-100 border-radius-lg "
                              src={article.image.length > 3 ? "http://localhost:4040/" + article.image[3].filename : "../../assets/img/image.png"}
                              alt="Image description"
                              loading="lazy"
                              style={{ padding: article.image.length > 3 ? ' 0%  ' : ' 20%', background: article.image.length > 3 ? '#transparent' : '#F5F5F5' }}
                            />
                          </a>
                        </figure>


                      </div>

                    </div>
                    <div className="col-lg-7">
                      <div className="about-text go-to">

                        <div className="row">
                          <div className="col-9">

                            {article.lib === null ? <h3 className="dark-color text-start " style={{ marginTop: '10%' }}>{article.lib} </h3> : <h3 className="dark-color text-start " style={{ marginTop: '10%' }}>article</h3>}
                          </div>

                        </div>





                        <div className="row about-list text-start">
                          <div className="text-start mt-2" >
                            {article.etat === "Neuf" ? <span className="badge bg-gradient-primary ">{article.etat}</span> : <span></span>}
                            {article.etat === "Bon etat" ? <span className="badge bg-gradient-success ">{article.etat}</span> : <span></span>}
                            {article.etat === "Passable" ? <span className="badge bg-gradient-dark " >{article.etat}</span> : <span></span>}
                            {article.etat === "" ? <span className="badge  " style={{ backgroundColor: '#A1A1A1' }}>-------</span> : <span></span>}
                          </div>



                          <div className="col-md-3">

                            <div className="" style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>
                              <span>
                                Réfeerence:
                              </span>
                              <span className="" style={{ fontWeight: '500', marginLeft: '10%', opacity: '70%' }}>
                                {article.ref}
                              </span>
                            </div>



                          </div>
                          <div className="col-md-1"></div>
                          <div className="col-md-3 ">


                            <div style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>
                              <span style={{ width: '100%', fontSize: '1.2rem', fontWeight: '500', color: '#20247b' }}>Prix:   </span>
                              <span style={{ fontWeight: '500', marginLeft: '10%', opacity: '70%' }}>
                                $  {article.montant_reverser !== null ? (article.montant_reverser).toFixed(3) : (0).toFixed(3)}
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
                        <Barcode value={article._id} width={1.5} displayValue={false} height={60} marginTop={30} background={'none'} />
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
                    <input type="file" className="form-control-file" id="exampleFormControlFile1" style={{ display: 'none' }} data-bs-dismiss="modal" onChange={fileChange} multiple />
                  </label>
                </div>

              </div>

            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

