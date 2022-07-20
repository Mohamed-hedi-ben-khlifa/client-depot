import {configureStore} from '@reduxjs/toolkit'
import rendez_vous from './rendez_vousSlice'
import notifications from './notificationSlice'
import deposants from './deposantSlice'
import boutique from './boutiqueSlice'
import articles from './articleSlice'
import reçus from './reçuSlice'
import user from './userSlice'



export default configureStore({
    reducer:{
        rendez_vous,
        notifications,
        boutique,
        deposants,  
        articles,
        reçus, 
        user,

    
        

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});



