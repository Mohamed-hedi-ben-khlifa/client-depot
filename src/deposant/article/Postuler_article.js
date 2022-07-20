import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { SocketContext } from '../../context/socket'
import { addNotifications } from '../../store/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ajouter_article, liste_des_article_de_deposant, supprimer_article } from '../../store/articleSlice'
import Barcode from 'react-barcode'


export default function Postuler_article(props) {

    const d = new Date()
    const socket = useContext(SocketContext)
    const [deposant] = useState(JSON.parse(localStorage.getItem('user')))
    const { boutique } = useSelector((state) => state.boutique)
    const [article, setArticle] = useState({
        user_id: deposant._id,
        lib: "",
        description: "",
        etat: "",
        prix_vente_ttc: 0,
        montant_reverser: 0,
        date_vente: null,
        date_reversement: null,
        date_depot: new Date(d.getFullYear(),d.getMonth(),d.getUTCDate()),
        status_reversement: null,
        status_acceptation: "En attente",
        status_vendu: null,
        image: []
    })

    const [etat, setEtat] = useState(0)


    const [articles, setArticles] = useState([])


    const afficher = () => {
        if (etat === 0) setEtat(1)
        else setEtat(0)
    }

    useEffect(() => {
        setArticle(prevState => ({
            ...prevState,
            montant_reverser: article.prix_vente_ttc - ((article.prix_vente_ttc * boutique.taux) / 100)
        }));
    }, [article.prix_vente_ttc])


    const dispatch = useDispatch()


    async function save() {

        articles?.map(article => {
            socket.emit("deposant_postule_un_article")
            let notification = {
                article: article,
                user: deposant,
                body: "Postuler",
                stauts: null
            }
            dispatch(addNotifications(notification))

        })

        setArticle({
            user_id: deposant._id,
            lib: "",
            description: "",
            etat: "",
            prix_vente_ttc: 0,
            montant_reverser: 0,
            date_vente: null,
            date_reversement: null,
            date_depot: new Date(d.getFullYear(),d.getMonth(),d.getUTCDate()),
            status_reversement: null,
            status_acceptation: "En attente",
            status_vendu: null,
            image: ""
        })

        setArticles([])
        if (etat === 0) { setEtat(1) } else { setEtat(0) }


        dispatch(liste_des_article_de_deposant(deposant._id)).then((action) => {
            props.setArticles(action.payload.article)
        })


    }

    async function ajouter() {



    }


    const handleChange = e => {
        const { name, value } = e.target;
        setArticle(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const retirer = (id) => {

        setArticles(articles.filter(function (article) {
            return article._id !== id
        }));


        dispatch(supprimer_article(id))
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


    return (
        <div>
            <div className="card  text-start">


                <div className="card-header pb-0">
                    <div className="row  mb-4">
                        <div className="col-lg-3 col-7">
                            <a onClick={() => afficher()}>
                                <h4>Postuler Un Article</h4>
                            </a>

                        </div>
                        <div className="col-1">
                            <a onClick={() => afficher()}>
                                {
                                    etat === 0 ? <img src="../../assets/img/plus.png" alt="team5" style={{ width: '30%', marginLeft: '-60%', marginTop: '4%' }} />
                                        : <img src="../../assets/img/moin.jpg" alt="team5" style={{ width: '30%', marginLeft: '-60%', marginTop: '4%' }} />
                                }
                            </a>

                        </div>

                    </div>

                </div>

                {etat !== 0 ?
                    <div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-1" />

                                <div className="col-md-3">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-2%' }}>libelle</h6>
                                        <input id="lib" className="form-control" placeholder="EX: pontalon, chemise, basquette" onKeyDown={handleChange} onChange={handleChange} value={article.lib} name="lib" />
                                    </div>
                                </div>

                                <div className="col-md-3 ps-2">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Etat </h6>
                                        <select className="form-control" placeholder="Neuf, Bon etat, Passablbe" name="etat" onKeyDown={handleChange} onChange={handleChange} value={article.etat}>
                                            <option value="" disabled>Neuf, Bon etat, Passablbe</option>
                                            <option value="Neuf">Neuf</option>
                                            <option value="Bon etat">Bon etat</option>
                                            <option value="Passable">Passable</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="input-group input-group-static mb-4">
                                        <h6 style={{ marginBottom: '-3%' }}>Prix de vente </h6>
                                        <input className="form-control" placeholder="$ 23,000" name="prix_vente_ttc" onKeyDown={handleChange} onChange={handleChange} value={article.prix_vente_ttc} type="number" />
                                    </div>
                                </div>


                                <div className="col-1" >
                                    <a type="button" onClick={() => ajouter()} >
                                        <img src="../../assets/img/plus.png" alt="team5" style={{ width: '40%', marginTop: '14%' }} />
                                    </a>
                                </div>




                            </div>


                            <div className="row  m-4">
                                <div className="col-lg-8"> </div>

                                <div className="col-2 ml-4" style={{ marginLeft: '5%' }}>

                                    <button className="btn bg-gradient-dark btn-icon col-10 m-2 mt-0 " type="button" onClick={() => save()}>
                                        <div className="d-flex align-items-center" style={{ marginLeft: '30%' }}  >
                                            Terminer
                                            <span className="material-icons">
                                                done
                                            </span>
                                        </div>
                                    </button>
                                </div>

                            </div>
                        </div>
                        <div className="table" style={{ marginLeft: '20%', width: '60%' }}>


                            <table className="table align-items-end " >

                                <tbody>
                                    {articles?.map((article, index) =>


                                        <tr key={index} style={{ marginLeft: '20%', width: '60%' }}>
                                            <td className="text-sm text-primary font-weight-bold" style={{ width: '2%' }}>
                                                {article.ref}
                                            </td>

                                            <td className="text-sm font-weight-bold " style={{ width: '10%' }}>

                                                {article.lib ? article.lib : "article"}
                                            </td>

                                            <td className="text-sm text-dark font-weight-bold" style={{ width: '5%' }}>
                                                {article.etat ? article.etat : "-------"}
                                            </td>
                                            <td className="text-sm font-weight-bold " style={{ width: '6%' }}>
                                                <Barcode value={article._id} width={0.5} displayValue={false} height={20} background={'none'} margin={0} />
                                            </td>
                                            <td className="text-sm text-dark font-weight-bold" style={{ width: '10%' }}>
                                                {formatDate(article.date_depot)}
                                            </td>
                                            <td className="text-xm font-weight-bold" style={{ width: '10%' }}>
                                                $ {(article.prix_vente_ttc)?.toFixed(3)}
                                            </td>
                                            <td className="text-xm font-weight-bold" style={{ width: '10%' }}>
                                                $ {(article.montant_reverser)?.toFixed(3)}
                                            </td>
                                            <td className="text-xs font-weight-bold" style={{ width: '5%' }}>
                                                <a className="avatar avatar-xs rounded-circle me-3" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid" onClick={() => retirer(article._id)}>
                                                    <img src="../../assets/img/refuser.jpg" alt="team5" />
                                                </a>
                                            </td>
                                        </tr>









                                    )}
                                </tbody>
                            </table>

                        </div>


                    </div>
                    : <div></div>}
            </div>

        </div>
    )

}
