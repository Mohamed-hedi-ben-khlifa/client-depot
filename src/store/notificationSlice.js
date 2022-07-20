import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const token = localStorage.getItem("token")


export const getNotifications = createAsyncThunk('notification/getNotifications',async (_,thunkAPI)=>{
    try{
        const resp = await axios.get(process.env.REACT_APP_BASE_URL+'/api/Notification/liste_des_notifications', { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data       
    }
    catch(error){
        console.error(error)
    }

})

export const addNotifications = createAsyncThunk('notification/addNotifications',async (notification,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const resp =await axios.post(process.env.REACT_APP_BASE_URL+'/api/Notification/ajouter', notification, { headers: { authorization :  `Bearer ${token}` } })
        const data = await resp.data
        return data       
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})

export const deleteNotifications = createAsyncThunk('notification/deleteNotifications',async (id,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
         await axios.delete(process.env.REACT_APP_BASE_URL+'/api/Notification/delete/'+id, { headers: { authorization :  `Bearer ${token}` } })
          
        return id 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})

export const getNotification = createAsyncThunk('notification/getNotification',async (notification,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/Notification/rechercher_notification_par_id/'+ notification._id, { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data    
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})

export const rechercher_notification_par_ref = createAsyncThunk('notification/rechercher_notification_par_ref',async (ref,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/Notification/rechercher_notification_par_ref/'+ ref, { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data    
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})

export const vuNotifications = createAsyncThunk('notification/vuNotifications',async (id,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const resp =await axios.patch(process.env.REACT_APP_BASE_URL+'/api/Notification/mettre_a_jou_status_notification_vu/'+id, { headers: { authorization :  `Bearer ${token}` } })
        const x = await resp.data
        return x       
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})

export const liste_des_notifications_non_vu = createAsyncThunk('notification/liste_des_notifications_non_vu',async (_,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/Notification/liste_des_notifications_non_vu', { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data    
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})

export const recherche_notification_deposant = createAsyncThunk('notification/recherche_notification_deposant',async (id,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/Notification/recherche_notification_deposant/'+id, { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data    
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})

export const liste_des_notifications_de_deposant_non_vu = createAsyncThunk('notification/liste_des_notifications_de_deposant_non_vu',async (id,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI
    try{
        const res =  await axios.get(process.env.REACT_APP_BASE_URL+'/api/Notification/liste_des_notifications_de_deposant_non_vu/'+id, { headers: { authorization :  `Bearer ${token}` } })
        const data  = await res.data    
        return data 
    }
    catch(error){
        return rejectWithValue(error.message)
    }

})



const notificationSlice = createSlice({

    name: 'notification',
    initialState: { notifications: []},
    extraReducers:{
       
        [getNotifications.fulfilled]: (state,action) =>{
            state.notifications = action.payload.notification
        },

        [getNotification.fulfilled]: (state,action) =>{
        },
       
       
        [addNotifications.fulfilled]: (state,action) =>{
            if(action.payload.success){
                state.notifications.push(action.payload.notification)
            }
            console.log(action.payload)
        },

        [deleteNotifications.fulfilled]: (state,action) =>{
            state.notifications=state.notifications.filter((el) =>  el._id !== action.payload)
        },

        [vuNotifications.fulfilled]: (state,action) =>{

            state.notifications=state.notifications.filter((el) =>  el._id !== action.payload)
            console.log(action.payload)
      
   
        },

        
    },
})

export default notificationSlice.reducer