import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const token = localStorage.getItem("token")


export const get_deposants = createAsyncThunk('deposant/get_deposants', async (_, thunkAPI) => {
    try {
        const resp = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Deposant/', { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data
    }
    catch (error) {
        console.error(error)
    }

})

export const ajouter_deposant = createAsyncThunk('deposant/ajouter_deposant', async (deposant, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const resp = await axios.post(process.env.REACT_APP_BASE_URL+'/api/Deposant/ajouter', deposant, { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const supprimer_deposant = createAsyncThunk('deposant/supprimer_deposant', async (deposant, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.delete(process.env.REACT_APP_BASE_URL+'/api/Deposant/delete/' + deposant._id, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const rechercher_deposant_par_telephone = createAsyncThunk('deposant/rechercher_deposant_par_telephone', async (telephone, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Deposant/rechercher_deposant_par_telephone/' + telephone, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const rechercher_deposant_par_id = createAsyncThunk('deposant/rechercher_deposant_par_telephone', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Deposant/rechercher_deposant_par_id/' + id, { headers: { authorization :  `Bearer ${token}` } })
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})

export const upload_image_deposant = createAsyncThunk('deposant/upload_image_deposant', async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {

    const config = {
      headers: {
        'content-type': 'multipart/form-data'     
      }
    }
        const res = await axios.patch(process.env.REACT_APP_BASE_URL+'/api/Deposant/upload/' + params.id, params.image, config)
        const data = await res.data
        return data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }

})


const deposantSlice = createSlice({

    name: 'deposants',
    initialState: {
        deposants: [{
            nom: null,
            prenom: null,
            email: null,
            pasword: null,
            telephone: null,
            adress: null,
            cin: null,
            role: null,
            dateN: null,
            codepostal: null,
            dateCreation: null,
            image: null
        }]
    },
    extraReducers: {}
}
)

export default deposantSlice.reducer