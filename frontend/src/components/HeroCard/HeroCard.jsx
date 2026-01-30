import React from 'react'
import defaultHeroImage from '../../assets/user.png'
import css from '../HeroCard/HeroCard.module.css'

const HeroCard = ({hero, handleDelete}) => {

  const imageFromBase = hero.images?.[0] ? `http://localhost:3000${hero.images[0]}` : defaultHeroImage

  return (
    <div className={css.heroCard}>
        <img src={imageFromBase} alt='hero-avatar'></img>
        <h3>{hero.nickname}</h3>
        <button className={css.deleteBtn} onClick={()=>{handleDelete(hero.id)}} type='button'>Delete</button>
    </div>
  )
}

export default HeroCard