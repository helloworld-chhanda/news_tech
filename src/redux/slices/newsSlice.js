import {createSlice} from '@reduxjs/toolkit'
import { fetchNews } from '../thunks/newsThunk'

const initialState = {
    isLoading: true,
    allNews: []
}
const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        
    },
    extraReducers: builder => {
        builder
            .addCase(fetchNews.pending,(state, action) => {
                state.isLoading = true
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                console.log('payload',action.payload)
                state.allNews = action.payload.articles
                state.isLoading = false
            })
    }
})


export default newsSlice.reducer