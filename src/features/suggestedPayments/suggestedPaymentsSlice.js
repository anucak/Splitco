import { createSlice } from '@reduxjs/toolkit';

const suggestedPaymentsSlice = createSlice({
    name: 'suggestedPayments',
    initialState: {
        suggestedPayments: [

        ]
    },
    reducers: {
        suggestPayments: (state, action) => {
            state.suggestedPayments = action.payload
        }
    }
})

export const selectSuggestedPayments = state => state.suggestedPayments.suggestedPayments;

export const { suggestPayments } = suggestedPaymentsSlice.actions;

export default suggestedPaymentsSlice.reducer;