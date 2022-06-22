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
                //console.log('payload',action.payload)
                state.allNews = action.payload.articles.map((news,index) => {
                    return {
                        ...news,
                        id: index+1
                    }
                })
                state.isLoading = false
            })
            .addCase(fetchNews.rejected,(state, action) => {
                state.isLoading = false
            })
    }
})


export default newsSlice.reducer