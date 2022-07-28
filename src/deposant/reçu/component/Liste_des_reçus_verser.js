import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rechercher_user_par_token } from '../../../store/userSlice'


export default function Liste_des_reçus_verser(props) {


    const [etat, setEtat] = useState(0)
    const [reçu, setReçu] = useState([])
    const {boutique}= useSelector( (state) => state.boutique)
    const [user, setUser] = useState()
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
  
      useEffect(() => {
          if (token !== null)
            dispatch(rechercher_user_par_token()).then(action => {
              setUser(action.payload.user)
            })
        }, [])
  


    const afficher = () => {
        if (etat === 0) setEtat(1)
        else setEtat(0)
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
            m = d.getMinutes(),
            s = d.getSeconds();



        return [h, m, s].join(':');
    }

    const modal = (reçu) => {
        setReçu(reçu);
      
    }

    return (
        <div>



            <div className="card mt-4  text-start">


                <div className="card-header pb-0">
                    <div className="row  mb-4">

                        <div className="col-lg-3 col-7">
                            <a onClick={() => afficher()}>
                                <h4>Liste Des Reçus Verser</h4>
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




                        </div>


                        <div className="table" style={{ marginLeft: '20%', width: '60%' }}>


                            <table className="table align-items-end " >
                                <thead>
                                    <tr>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="10%" >Réference</th>
                                        <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date dépot</th>
                                        <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Total Prix</th>

                                        <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"  >Nbr D'article</th>

                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Montant à versé</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.reçus_payer?.map((reçu, index) =>

                                        <tr key={index} >
                                            <td className="text-sm text-primary text-center font-weight-bold" >
                                                <a data-bs-toggle="modal" data-bs-target="#recu" type="button" onClick={() => modal(reçu)}>

                                                    {reçu.ref}
                                                </a>
                                            </td>

                                            {
                                                reçu.date_reçu !== null ?
                                                    <td className="text-sm text-dark text-center font-weight-bold" >
                                                        {formatDate(reçu.date_reçu)}
                                                    </td> :
                                                    <td className="text-sm text-dark text-center font-weight-bold" >
                                                        --/--/----
                                                    </td>
                                            }
                                           

                                            <td className="text-sm text-primary text-center font-weight-bold" >
                                                $ {(reçu.total)?.toFixed(3)}
                                            </td>
                                            <td className="text-xm text-center font-weight-bold" >
                                                {reçu.nombre_articles}
                                            </td>

                                            <td className="text-xm text-success text-center font-weight-bold" >
                                                $  {(reçu.total_a_verser)?.toFixed(3)}
                                            </td>


                                        </tr>









                                    )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                    : <div></div>}
            </div>


            <div className="modal fade" id="recu" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content text-center  ">
                        <h4 className="text-center mt-4" style={{ fontWeight: '700' }}>{boutique?.nom} </h4>

                        <p style={{ marginTop: '2%' }}>Email: {boutique?.email}</p>
                        <p style={{ marginTop: '-4%' }}>Adress: {boutique?.adress}</p>
                        <p style={{ marginTop: '-4%' }}>Tél: +216 {boutique?.telephone}</p>

                        <img className="w-40  " src="../../assets/img/Barcode-PNG-Image.png" alt="ladydady" loading="lazy" style={{ marginLeft: '31%' }} />
                        <p className=" text-dark">Sahloul le {formatDate(new Date())}</p>





                        <div className="row w-100 " style={{ marginLeft: '5%' }}>
                            <div className="col-9">
                                <span><h6 className="text-start " style={{ fontWeight: '700' }}> Deposant :</h6></span>
                                <span><p style={{ marginTop: '-9.5%', marginLeft: '6%' }}>{user?.prenom} {user?.nom}</p></span>
                            </div>

                            <div className="col-3">
                                <span><h6 className="text-start " style={{ fontWeight: '700', marginLeft: '-30%' }}>Réf: </h6></span>
                                <span><p style={{ marginTop: '-33%', marginLeft: '-36%' }}>{user?.ref}</p></span>
                            </div>

                        </div>
                        <div className="table w-90 ">

                            <table className="table align-items-center m-4 mt-2" style={{ border: '0 px solid' }}>
                                <thead>
                                    <tr>
                                        <th className=" text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="10%">Réf</th>
                                        <th className=" text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="80%">Lib.article</th>
                                        <th className=" text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="10%">Prix</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {reçu.articles?.map((article, index) =>

                                        <tr key={index} >

                                            <td className="align-middle text-center text-sm " style={{ marginLeft: '-10%', border: '0px solid' }}>
                                                <span className="text-xm  text-primary font-weight-bold"> {article.ref}</span>
                                            </td>
                                            <td className="align-middle text-start p-4 pt-0 pb-0 text-sm  " style={{ border: '0 px solid' }}>
                                                {article.lib !== "" ? <span className="text-sm font-weight-bold"  >{article.lib}</span> : <span>Article  </span>}
                                            </td>
                                            <td className="align-middle text-center text-sm" style={{ border: '0 px solid' }}>
                                                <span className="text-xm  text-dark font-weight-bold">$ {article.montant_reverser} ,000</span>
                                            </td>


                                        </tr>


                                    )}
                                </tbody>
                            </table>

                            <div className="row w-100 " style={{ border: '0px ', marginLeft: '15%' }}>
                                <div className="col-6">
                                    <h4 className="text-start " style={{ fontWeight: '700' }}>  </h4>
                                </div>
                                <div className="col-6">
                                    <h4 className="text-start " style={{ fontWeight: '700' }}>Total: {(reçu.total_a_verser)?.toFixed(3)} $  </h4>

                                </div>
                            </div>

                            <p style={{ marginTop: '2%', border: '0px solid', marginLeft: '12%' }}>Merci de votre visite</p>
                            <p style={{ marginTop: '-4%', border: '0px solid', marginLeft: '12%' }}>Merci à bientot</p>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
