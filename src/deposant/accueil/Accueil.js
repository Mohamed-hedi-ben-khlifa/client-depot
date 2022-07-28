import React, {  useEffect, useState } from 'react'

import { liste_des_article_de_deposant,nombre_total_article_deposant,liste_des_article_non_verser} from '../../store/articleSlice'
import { useDispatch } from 'react-redux'
import { rechercher_user_par_token } from '../../store/userSlice'


export default function Accueil (props){


  
    const dispatch = useDispatch()


    const [articles, setArticles] = useState([])
    const [nombre_articles, setNombre_articles] = useState([])
    const [articles_vendu, setArticles_vendu] = useState(0)
    const [montant_a_recevoir, setMontant_a_recevoir] = useState(0)
    const [total_montant, setTotal_montant] = useState(0)
    const [user, setUser] = useState()
  const token = localStorage.getItem("token")

    useEffect(() => {
        if (token !== null)
          dispatch(rechercher_user_par_token()).then(action => {
            setUser(action.payload.user)
          })
      }, [])

    useEffect(() => {
       
        dispatch(liste_des_article_de_deposant(user?._id)).then((action)=>{
            setArticles(action.payload.article)
        })
      }, [])

      useEffect(() => {
        dispatch(nombre_total_article_deposant(user?._id)).then((action)=>{
            setNombre_articles(action.payload.article.length)
        })
      }, [])

      useEffect(() => {
        dispatch(nombre_total_article_deposant(user?._id)).then((action)=>{
            setTotal_montant(action.payload.article.map(article => article.montant_reverser).reduce((prev, next) => prev + next))
        })
      }, [])

      useEffect(() => {
        dispatch(liste_des_article_non_verser(user?._id)).then((action)=>{
            setArticles_vendu(action.payload.article.length)
        })
      }, [])

      useEffect(() => {
        dispatch(liste_des_article_non_verser(user?._id)).then((action)=>{
            const x = action.payload.article
            setMontant_a_recevoir(x.map(article => article.montant_reverser).reduce((prev, next) => prev + next))        
        })
        
      }, [])
  
  



        return (
            <div>
                <div className="container-fluid py-4" >
                <div className="row" style={{marginTop:'4%', width:'105%' , marginLeft:'-2.5%'}}>
                        <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                            <div className="card">
                                <div className="card-header p-3 pt-2 text-start">
                                    <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                                        <i className="material-icons opacity-10">shopping_cart</i>
                                    </div>
                                    <div className="text-end pt-1">
                                        <p className="text-sm mb-0 text-capitalize">Nombre D'articles</p>
                                        <h4 className="mb-0">{nombre_articles}</h4>
                                    </div>
                                </div>
                                <hr className="dark horizontal my-0 text-start" />
                                <div className="card-footer p-3">
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-6">
                            <div className="card">
                                <div className="card-header p-3 pt-2 text-start">
                                    <div className="icon icon-lg icon-shape  shadow-info text-center border-radius-xl mt-n4 position-absolute" style={{ backgroundColor: '#6d6d6d' }}>
                                        <i className="material-icons opacity-10">shopping_cart_checkout</i>
                                    </div>
                                    <div className="text-end pt-1">
                                        <p className="text-sm mb-0 text-capitalize">Articles Vendu</p>
                                        <h4 className="mb-0">{articles_vendu || 0}</h4>
                                    </div>
                                </div>
                                <hr className="dark horizontal my-0" />
                                <div className="card-footer p-3">
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                            <div className="card">
                                <div className="card-header p-3 pt-2 text-start">
                                    <div className="icon icon-lg icon-shape  text-center border-radius-xl mt-n4 position-absolute" style={{ backgroundColor: '#484848' }}>
                                        <i className="material-icons opacity-10">money_off</i>
                                    </div>
                                    <div className="text-end pt-1">
                                        <p className="text-sm mb-0 text-capitalize">Montant à recevoir</p>
                                        <h4 className="mb-0">$ {(montant_a_recevoir).toFixed(3)}</h4>
                                    </div>
                                </div>
                                <hr className="dark horizontal my-0" />
                                <div className="card-footer p-3">
                                </div>
                            </div>
                        </div>
                       

                    </div>

                

                </div>
            </div>
        )
    }

