import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import css from './HeroDetails.module.css' 
import defaultHeroImage from '../../assets/user.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHero } from '../../redux/hero/operations.js'


const HeroDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const {error,loading,currentHero} = useSelector((state)=>state.hero)
  

  useEffect(()=>{
    dispatch(fetchHero(id))
  },[dispatch,id])




  if (loading) return <p className={css.status}>Loading...</p>
  if (error) return <p className={css.status}>Error: {error}</p>
  if (!currentHero) return <p className={css.status}>No hero found</p>

  return (
    <div className={css.container}>
      <h2 className={css.title}>{currentHero.nickname}</h2>

      <div className={css.images}>
        {currentHero.images && currentHero.images.length > 0 ? (
          currentHero.images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:3000${img}` || defaultHeroImage}
              alt={`${currentHero.nickname}-${index}`}
              className={css.heroImage}
            />
          ))
        ) : (
          <img src={defaultHeroImage} alt="default-hero" className={css.heroImage} />
        )}
      </div>

      <div className={css.info}>
        <p><strong>Real Name:</strong> {currentHero.real_name || 'Unknown'}</p>
        <p><strong>Origin:</strong> {currentHero.origin_description || 'Unknown'}</p>
        <p><strong>Superpowers:</strong> {currentHero.superpowers}</p>
        <p><strong>Catchphrase:</strong> {currentHero.catch_phrase || 'None'}</p>
      </div>
    </div>
  )
}

export default HeroDetails
