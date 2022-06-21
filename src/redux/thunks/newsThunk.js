import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=apple&from=2022-06-16&to=2022-06-16&sortBy=popularity&apiKey=67a73fe9e2034c589ed00342ef80e50d`)
    return response.data
})