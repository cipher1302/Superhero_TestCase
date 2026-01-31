import { useState } from 'react'
import HeroForm from './components/HeroForm/HeroForm.jsx'
import HeroList from './components/HeroList/HeroList.jsx'
import HeroDetails from './components/HeroDetails/HeroDetails.jsx'
import { Routes, Route } from "react-router-dom"
import HeroUpdateForm from './components/HeroUpdateForm/HeroUpdateForm.jsx'


function App() {

 return (
    <Routes>
      <Route path="/" element={
        <>
          <HeroForm />
          <HeroList />
        </>
      } />

      <Route path="/heroes/hero/:id" element={<HeroDetails />} />
      <Route path="/heroes/update/:id" element={<HeroUpdateForm />} />
    </Routes>
  )
}


export default App
