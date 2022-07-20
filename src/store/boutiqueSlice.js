import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const token = localStorage.getItem("token")

export const information = createAsyncThunk('boutique/information',async (_,thunkAPI)=>{
    try{
        const resp = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Boutique/', { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data       
    }
    catch(error){
        console.error(error)
    }

})

export const modifier_pofit_des_articles_deposant = createAsyncThunk('boutique/modifier_pofit_des_articles_deposant',async (boutique,thunkAPI)=>{
    try{
        const resp = await axios.patch(process.env.REACT_APP_BASE_URL+'/api/Boutique/modifier_pofit_des_articles_deposant/'+boutique._id,boutique, { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data       
    }
    catch(error){
        console.error(error)
    }

})

export const modifier_nom_boutique = createAsyncThunk('boutique/modifier_nom_boutique',async (boutique,thunkAPI)=>{
    try{
        const resp = await axios.patch(process.env.REACT_APP_BASE_URL+'/api/Boutique/modifier_non_du_boutique/'+boutique._id,boutique, { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data       
    }
    catch(error){
        console.error(error)
    }

})

export const modifier_boutique = createAsyncThunk('boutique/modifier_boutique',async (boutique,thunkAPI)=>{
    try{
        const resp = await axios.patch(process.env.REACT_APP_BASE_URL+'/api/Boutique/modifier/'+boutique._id,boutique, { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data       
    }
    catch(error){
        console.error(error)
    }

})


export const upload_logo_boutique = createAsyncThunk('boutique/upload_logo_boutique', async (b, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        authorization :  `Bearer ${token}`
      }
    }
        const res = await axios.patch(process.env.REACT_APP_BASE_URL+'/api/Boutique/logo/' + b.id, b.image, config)
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})




const boutiqueSlice = createSlice({

    name: 'boutique',
    initialState: { 
        boutique:{
            email: null,
            nom:null,
            taux: null,
            telephone: null,
            logo: null,
            _id: "6295faa203fd2dc800c3d945"
        }

    },
    extraReducers:{
      
        [information.fulfilled]: (state,action) =>{
           
                state.boutique = action.payload.boutique[0]
           
        

        },
       
        
    },

})



export default boutiqueSlice.reducer