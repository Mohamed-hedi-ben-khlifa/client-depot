import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const token = localStorage.getItem("token")



export const ajouter_article = createAsyncThunk('article/ajouter_article', async (article, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try { 
                                        
        const resp = await axios.post( process.env.REACT_APP_BASE_URL+'/api/Article/ajouter', article, { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const nombre_total_article_deposant = createAsyncThunk('article/nombre_total_article_deposant', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const resp = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/liste_des_articles_de_deposant/' + id, { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data
        
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})



export const recherche_article_par_reference = createAsyncThunk('article/recherche_article_par_reference', async (ref, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const resp = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/recherche_article_par_reference/' + ref, { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data

        
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const recherche_article_par_id = createAsyncThunk('article/recherche_article_par_id', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const resp = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/recherche_article_par_id/' + id, { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data

        
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const recherche_article_non_vendu_par_id = createAsyncThunk('article/recherche_article_non_vendu_par_id', async (ref, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const resp = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/rechercher_article_non_vendu/' + ref, { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data

        
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const nombre_total_article_vendu = createAsyncThunk('article/nombre_total_article_vendu', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const resp = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/liste_des_articles_vendud_un_deposant/' + id, { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data
        
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_articles_vendu = createAsyncThunk('article/liste_des_articles_vendu', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const resp = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/liste_des_articles_vendu', { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data
        
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_articles_boutique_vendu = createAsyncThunk('article/liste_des_articles_boutique_vendu', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const resp = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/statistique/liste_des_articles_boutique_vendu', { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data
        
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})




export const liste_des_article_non_verser = createAsyncThunk('article/liste_des_article_non_verser', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/list_article_vendu_non_verse/' + id, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data

        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_articles = createAsyncThunk('article/liste_des_articles', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/', { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_article_de_deposant = createAsyncThunk('article/liste_des_articles_de_deposant', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/liste_des_articles_de_deposant/' + id, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_article_de_deposants = createAsyncThunk('article/liste_des_articles_de_deposant', async (deposant, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/liste_des_articles_de_deposant/' + deposant._id, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})



export const liste_des_article_en_attente = createAsyncThunk('article/liste_des_article_en_attente', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/liste_des_article_en_attente/en_attente', { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_articles_accepter = createAsyncThunk('article/liste_des_articles_accepter', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/statistique/liste_des_articles_accepter', { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})


export const liste_des_articles_en_attente = createAsyncThunk('article/liste_des_articles_en_attente', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/statistique/liste_des_articles_en_attente', { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_articles_non_vendu = createAsyncThunk('article/liste_des_articles_non_vendu', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/statistique/liste_des_articles_non_vendu', { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_articles_refuser = createAsyncThunk('article/liste_des_articles_refuser', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/statistique/liste_des_articles_refuser', { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_article_en_attente_ce_jour = createAsyncThunk('article/liste_des_article_en_attente_ce_jour', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/statistique/liste_des_article_en_attente_ce_jour', { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_nouvels_articles = createAsyncThunk('article/liste_des_nouvels_articles', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const resp = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/statistique/liste_des_nouvels_articles', { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data
        
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_articles_vendu_ce_jour = createAsyncThunk('article/liste_des_articles_vendu_ce_jour', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const resp = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/statistique/liste_des_articles_vendu_ce_jour', { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data
        
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_articles_des_deposants_vendus_et_verves = createAsyncThunk('article/liste_des_articles_des_deposants_vendus_et_verves', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/statistiques/liste_des_articles_des_deposants_vendus_et_verves', { headers: { authorization :  `Bearer ${token}` } } )
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const montant_a_reverser_ce_jour = createAsyncThunk('article/montant_a_reverser_ce_jour', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/statistique/montant_a_reverser_ce_jour', { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_articles_des_deposants_vendus_non_verves = createAsyncThunk('article/liste_des_articles_des_deposants_vendus_non_verves', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/statistique/liste_des_articles_des_deposants_vendus_non_verves', { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_articles_vendu_par_jours = createAsyncThunk('article/liste_des_articles_vendu_par_jours', async (date, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/statistique/liste_des_articles_vendu_par_jours/'+date, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const liste_des_articles_vendu_par_mois = createAsyncThunk('article/liste_des_articles_vendu_par_mois', async (date, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/statistique/liste_des_articles_vendu_par_mois/'+date, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const rechercher_liste_des_article_par_status_vente = createAsyncThunk('article/rechercher_liste_des_article_par_status_vente', async (status, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/vendu/rechercher_liste_des_article_par_status_vente/'+status, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const rechercher_liste_des_article_par_status_vervsement = createAsyncThunk('article/rechercher_liste_des_article_par_status_vervsement', async (status, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/verser/rechercher_liste_des_article_par_status_vervsement/'+status, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const rechercher_liste_des_article_par_status_acceptation = createAsyncThunk('article/rechercher_liste_des_article_par_status_acceptation', async (status, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/acceptation/rechercher_liste_des_article_par_status_acceptation/'+status, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const rechercher_liste_des_article_par_etat = createAsyncThunk('article/rechercher_liste_des_article_par_etat', async (status, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Article/etat/rechercher_liste_des_article_par_etat/'+status, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})



export const update_status_reversement = createAsyncThunk('article/update_status_reversement', async (article, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.patch(process.env.REACT_APP_BASE_URL+'/api/Article/modifier_status_reversement/' + article._id,{}, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const accepter_un_article_postuler_par_deposant = createAsyncThunk('article/accepter_un_article_postuler_par_deposant', async (article, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.patch(process.env.REACT_APP_BASE_URL+'/api/Article/accepter_un_article_postuler_par_deposant/' + article._id,{}, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})


export const refuser_un_article_postuler_par_deposant = createAsyncThunk('article/refuser_un_article_postuler_par_deposant', async (article, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.patch(process.env.REACT_APP_BASE_URL+'/api/Article/refuser_un_article_postuler_par_deposant/' + article._id,{}, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const retour_produit_depuis_client = createAsyncThunk('article/retour_produit_depuis_client', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.patch(process.env.REACT_APP_BASE_URL+'/api/Article/retour_produit_depuis_client/' + id,{}, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const retour_produit_vers_deposant = createAsyncThunk('article/retour_produit_vers_deposant', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.patch(process.env.REACT_APP_BASE_URL+'/api/Article/retour_produit_vers_deposant/' + id,{}, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})
export const modifier_status_vendu_d_un_article = createAsyncThunk('article/modifier_status_vendu', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.patch(process.env.REACT_APP_BASE_URL+'/api/Article/modifier_status_vendu/' + id,{}, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }
 
})

export const supprimer_article = createAsyncThunk('article/supprimer_article',async (id,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.delete(process.env.REACT_APP_BASE_URL+'/api/Article/delete/'+ id, { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data    
        return data 
        
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})





const deposantSlice = createSlice({

    name: 'articles',
    initialState: {
        articles: [{
            user_id: null,
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
            image: null
        }],

        nombre_total_des_article_deposant: null,
        articles_non_verser: []
    },
    extraReducers: {



        [ajouter_article.fulfilled]: (state, action) => {
            if (action.payload.success) {
            }
        },

        [nombre_total_article_deposant.fulfilled]: (state, action) => {

            state.nombre_total_des_article_deposant = action.payload.article.length
        },

        [nombre_total_article_vendu.fulfilled]: (state, action) => {

            
        },

        [liste_des_article_non_verser.fulfilled]: (state, action) => {

            state.articles_non_verser = action.payload.article
        },

        [update_status_reversement.fulfilled]: (state, action) => {

            console.log(action.payload);
        },


    },

})

export default deposantSlice.reducer