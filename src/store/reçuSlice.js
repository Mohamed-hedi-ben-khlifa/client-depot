import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const token = localStorage.getItem("token")


export const ajouter_reçu = createAsyncThunk('reçu/ajouter_reçu',async (reçu,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const resp =await axios.post(process.env.REACT_APP_BASE_URL+'/api/Recu/ajouter', reçu, { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data       
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})

export const rechercher_reçu_deposant = createAsyncThunk('reçu/rechercher_reçu_deposant',async (id,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/Recu/liste_des_recus_deposer_de_deposant/'+ id, { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data    
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})

export const rechercher_recu_caisse_par_reference = createAsyncThunk('reçu/rechercher_recu_caisse_par_reference',async (ref,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/Recu/rechercher_recu_caisse_par_reference/'+ ref, { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data    
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})

export const rechercher_recu_deposer_par_reference = createAsyncThunk('reçu/rechercher_recu_deposer_par_reference',async (ref,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/Recu/rechercher_recu_deposer_par_reference/'+ ref, { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data    
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})



export const rechercher_recu_verser_par_reference = createAsyncThunk('reçu/rechercher_recu_verser_par_reference',async (ref,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/Recu/rechercher_recu_verser_par_reference/'+ ref, { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data    
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})



export const liste_des_reçus_deposer = createAsyncThunk('reçu/liste_des_reçus_deposer',async (_,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/Recu/liste_des_recus_deposer', { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data  
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})

export const liste_des_reçus_verser = createAsyncThunk('reçu/liste_des_reçus_verser',async (_,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/Recu/liste_des_recus_verser', { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data  
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})

export const liste_des_reçus_caisse = createAsyncThunk('reçu/liste_des_reçus_caisse',async (_,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/Recu/liste_des_recus_caisse', { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data  
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})

export const liste_des_recu_caisse_ce_jour = createAsyncThunk('reçu/liste_des_recu_caisse_ce_jour',async (_,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/Recu/statistique/liste_des_recu_caisse_ce_jour', { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data  
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})


export const liste_des_reçus_payer = createAsyncThunk('reçu/liste_des_reçus_payer',async (id,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/Recu/liste_des_recus_payer_de_deposant/'+ id, { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data  
       
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})








const deposantSlice = createSlice({

    name: 'reçus',
    initialState: { 
        
        reçus:[],
        reçus_non_verser:[]

                },
    extraReducers:{
      
       
        [ajouter_reçu.fulfilled]: (state,action) =>{
            if(action.payload.success){
                state.reçus.push(action.payload.reçu)
            }
        } ,
        
        
        [rechercher_reçu_deposant.fulfilled]: (state,action) =>{
            if(action.payload.success )
            {
                state.reçus = action.payload.reçu
            }
  

        },

        [liste_des_reçus_payer.fulfilled]: (state,action) =>{
            if(action.payload.success )
            {
                state.reçus_non_verser = action.payload.reçu
            }
  

        },

      
        
    },

})

export default deposantSlice.reducer