import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const token = localStorage.getItem("token")

export const ajouter_un_rendez_vous = createAsyncThunk('rendez_vous/ajouter_un_rendez_vous',async (rendez_vous,thunkAPI)=>{
    try{
        const resp = await axios.post(process.env.REACT_APP_BASE_URL+'/api/Rendez_vous/ajouter', { headers: { authorization :  `Bearer ${token}` } },rendez_vous)
        const data = await resp.data
        return data       
    }
    catch(error){
        console.error(error)
    }

})


export const liste_des_rendez_vous = createAsyncThunk('rendez_vous/liste_des_rendez_vous',async (_,thunkAPI)=>{
    try{
        const resp = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Rendez_vous/', { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data       
    }
    catch(error){
        console.error(error)
    }

})


export const supprimer_rendez_vous = createAsyncThunk('rendez_vous/supprimer_rendez_vous',async (rendez_vous,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.delete(process.env.REACT_APP_BASE_URL+'/api/Rendez_vous/delete/'+ rendez_vous._id, { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data    
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})


export const rechercher_liste_des_rendez_vous_par_date = createAsyncThunk('rendez_vous/rechercher_liste_des_rendez_vous_par_date',async (date,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/api/Rendez_vous/rechercher_liste_des_rendez_vous_par_date/'+ date, { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data    
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})

const rendez_vousSlice = createSlice({

    name: 'rendez_vous',
    initialState: { 
        rendez_vous:{}
    },
    extraReducers:{ },

})


export default rendez_vousSlice.reducer