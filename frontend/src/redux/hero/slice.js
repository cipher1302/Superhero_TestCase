import { createSlice } from "@reduxjs/toolkit";
import { fetchHeroes,fetchHero, deleteHero, createHero } from "./operations.js";
import { act } from "react";

const slice = createSlice({
    name:"hero",
    initialState:{
        loading:false,
        totalPages:1,
        error:null,
        data:[],
        currentHero:null,
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchHeroes.pending, (state,action)=>{
            state.loading = true,
            state.error=null
        }).addCase(fetchHeroes.fulfilled, (state,action)=>{
            state.loading = false;
            state.error=null;
            const { data: newHeroes, totalPages } = action.payload.data;
            const heroFiltered = newHeroes.filter(hero => !state.data.some(existingHero => existingHero.id === hero.id))
            state.data = [...state.data, ...heroFiltered]
            state.totalPages = totalPages
        }).addCase(fetchHeroes.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
        }).addCase(fetchHero.pending, (state,action)=>{
            state.loading = true,
            state.error=null
        }).addCase(fetchHero.fulfilled, (state,action)=>{
            state.loading = false,
            state.error=false,
            state.currentHero = action.payload.data
        }).addCase(fetchHero.rejected, (state,action)=>{
            state.loading = false,
            state.error = true
        }).addCase(deleteHero.pending,(state, action)=>{
            state.loading = true,
            state.error = false
        }).addCase(deleteHero.fulfilled, (state,action)=>{
            state.loading = false,
            state.error = false,
            state.data = state.data.filter(hero=> hero.id != action.payload)

        }).addCase(deleteHero.rejected, (state,action)=>{
            state.loading = false,
            state.error = true
        }).addCase(createHero.pending, (state,action)=>{
            state.loading = true,
            state.error = false
        }).addCase(createHero.fulfilled, (state,action)=>{
            state.loading = false,
            state.error = false,
            state.data.push(action.payload)
        }).addCase(createHero.rejected, (state,action)=>{
            state.loading = false,
            state.error = true
        })
    }
})




export default slice.reducer