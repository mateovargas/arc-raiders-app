import { createSlice } from '@reduxjs/toolkit';

const initialState: Array<unknown> = [];

const arcSlice = createSlice({
    name: 'arc',
    initialState,
    reducers: {
        setArc(state, action) {
            return Array.isArray(action.payload) ? action.payload : state;
        },
        clearArc() {
            return [];
        }
    }
})

export const { setArc, clearArc } = arcSlice.actions;
export default arcSlice.reducer;