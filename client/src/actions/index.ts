import axios from 'axios';
import type { Dispatch } from 'react';

export const fetchArcData = () => async (dispatch: Dispatch<unknown>) => {
    try {
        const response = await axios.get('/api/arc-enemies');
        dispatch({ type: 'FETCH_ARC_DATA_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'FETCH_ARC_DATA_FAILURE', payload: error });
    }
}