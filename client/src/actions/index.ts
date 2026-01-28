import axios from 'axios';
import type { Dispatch } from 'react';

import { setArc } from '../reducers/arcSlice';

export const fetchArcData = () => async (dispatch: Dispatch<unknown>) => {
    const res = await axios.get('/api/ardb/arc');
    dispatch(setArc(res.data))
}