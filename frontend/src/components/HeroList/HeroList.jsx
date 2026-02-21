import React, { useEffect } from 'react'
import HeroCard from '../HeroCard/HeroCard.jsx'
import { useState } from 'react'
import css from '../HeroList/HeroList.module.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroes, deleteHero } from '../../redux/hero/operations.js';

const HeroList = () => {
     const dispatch = useDispatch()
    const [heroes, setHeroes] = useState([])
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const heroState = useSelector((state)=>state.hero)
   useEffect(()=>{
      dispatch(fetchHeroes({page,limit:5}))
   },[page,dispatch])


       
    const handleDelete = (id) =>{
      dispatch(deleteHero(id))
    }


  return (
    <div>
    <h1 className={css.hero_title}>List of all your heroes</h1>
    <div className={css.hero_container}>
        {heroState.data.map(hero=>(
            <HeroCard key={hero.id} hero={hero} handleDelete={handleDelete}/>
        ))}
    </div>

     {page < totalPages && (
        <button
          className={css.loadMoreBtn}
          onClick={() => setPage(prev => prev + 1)}
        >
            Load More
        </button>
      )}
    </div>
   

  )
}

export default HeroList