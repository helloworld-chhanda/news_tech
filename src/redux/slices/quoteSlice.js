import {createSlice} from '@reduxjs/toolkit'
import { fetchQuote } from '../thunks/quoteThunk'

const initialState = {
    quote:''
}
const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchQuote.pending,(state, action) => {
                
            })
            .addCase(fetchQuote.fulfilled, (state, action) => {
                state.quote = action.payload.description
                
            })
    }
})
export default quoteSlice.reducer