import React, { useEffect } from 'react'
import HeroCard from '../HeroCard/HeroCard.jsx'
import { useState } from 'react'
import css from '../HeroList/HeroList.module.css'

const HeroList = () => {

    const [heroes, setHeroes] = useState([])
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)

    useEffect(() => {
  const loadListHeroes = async () => {
    try {
      const resp = await fetch(`http://localhost:3000/api/heroes?page=${page}&limit=5`);
      const data = await resp.json(); 
      console.log(data); 

      const { data: newHeroes, totalPages } = data.data;

      setHeroes(prev => {
        const filteredHeroes = newHeroes.filter(
          h => !prev.some(existing => existing.id === h.id)
        );
        return [...prev, ...filteredHeroes];
      });

      setTotalPages(totalPages);

    } catch (error) {
      console.log(error);
    }
  }

  loadListHeroes();
}, [page]);

       
    const handleDelete = (id) =>{
         fetch(`http://localhost:3000/api/heroes/${id}`, {
      method: 'DELETE',
    })
    .then(res=>{
        if (!res.ok) throw new Error('Failed to delete')
        setHeroes(prev => prev.filter(hero => hero.id !== id))
    })
    .catch(err => console.error(err))
    }


  return (
    <div>
    <h1 className={css.hero_title}>List of all your heroes</h1>
    <div className={css.hero_container}>
        {heroes.map(hero=>(
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