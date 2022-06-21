import {configureStore} from '@reduxjs/toolkit'
import newsReducer from './slices/newsSlice'
import quoteReducer from './slices/quoteSlice'
const store = configureStore({
    reducer:{
        news:newsReducer,
        quote:quoteReducer
    }
})
export default store