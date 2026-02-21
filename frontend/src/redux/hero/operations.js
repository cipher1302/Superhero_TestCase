import apiClient from '../../api/api.js'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHeroes = createAsyncThunk("heroes/getAllHeroes",async ({page=1, limit=5})=>{
    const res = await apiClient.get("/",{
        params:{page,limit}
    })
    return res.data
})

export const fetchHero = createAsyncThunk("heroes/getOneHero",async (heroId)=>{
    const res = await apiClient.get(`/${heroId}`)
    return res.data
})

export const deleteHero = createAsyncThunk("heroes/deleteHero",async (heroId)=>{
    await apiClient.delete(`/${heroId}`)
    return heroId
})