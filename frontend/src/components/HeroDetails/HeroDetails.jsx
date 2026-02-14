import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import css from './HeroDetails.module.css' 
import defaultHeroImage from '../../assets/user.png'

const HeroDetails = () => {
  const { id } = useParams()
  const [hero, setHero] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3000/api/heroes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch hero')
        return res.json()
      })
      .then(data => setHero(data.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className={css.status}>Loading...</p>
  if (error) return <p className={css.status}>Error: {error}</p>
  if (!hero) return <p className={css.status}>No hero found</p>

  return (
    <div className={css.container}>
      <h2 className={css.title}>{hero.nickname}</h2>

      <div className={css.images}>
        {hero.images && hero.images.length > 0 ? (
          hero.images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:3000${img}` || defaultHeroImage}
              alt={`${hero.nickname}-${index}`}
              className={css.heroImage}
            />
          ))
        ) : (
          <img src={defaultHeroImage} alt="default-hero" className={css.heroImage} />
        )}
      </div>

      <div className={css.info}>
        <p><strong>Real Name:</strong> {hero.real_name || 'Unknown'}</p>
        <p><strong>Origin:</strong> {hero.origin_description || 'Unknown'}</p>
        <p><strong>Superpowers:</strong> {hero.superpowers}</p>
        <p><strong>Catchphrase:</strong> {hero.catch_phrase || 'None'}</p>
      </div>
    </div>
  )
}

export default HeroDetails
