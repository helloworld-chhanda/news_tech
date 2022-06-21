import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchQuote = createAsyncThunk('quote/fetchQuote', async () =>{
    let response = await axios.get(`https://api.quotable.io/random`)
    return response.data
})