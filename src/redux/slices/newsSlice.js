import {createSlice} from '@reduxjs/toolkit'
import { fetchNews } from '../thunks/newsThunk'

const initialState = {
    isLoading: true,
    allNews: [],
    page: 1,
    limit: 9,
    currentNews: []
}
const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
      nextPage(state,action) {
          state.page++
          state.currentNews = state.allNews.slice(0,(state.limit*state.page))
      }  
    },
    extraReducers: builder => {
        builder
            .addCase(fetchNews.pending,(state, action) => {
                state.isLoading = true
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                //console.log('payload',action.payload)
                const result = action.payload.articles.map((news,index) => {
                    return {
                        ...news,
                        id: index + 1
                    }
                })
                state.allNews = result
                state.currentNews = result.slice(0,9)
                state.isLoading = false
            })
            .addCase(fetchNews.rejected,(state, action) => {
                state.isLoading = false
            })
    }
})

export const {nextPage} = newsSlice.actions 


export default newsSlice.reducer