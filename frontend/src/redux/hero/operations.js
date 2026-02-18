import apiClient from '../../api/api.js'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHeroes = createAsyncThunk("heroes/getAllHeroes",async ({page=1, limit=5})=>{
    const res = await apiClient.get("/",{
        params:{page,limit}
    })
    return res.data
})