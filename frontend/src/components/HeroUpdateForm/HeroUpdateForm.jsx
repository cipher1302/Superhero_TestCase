import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import css from '../HeroUpdateForm/HeroUpdateForm.module.css'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'


const HeroSchema = Yup.object().shape({
  nickname: Yup.string().min(2).max(20).required('Nickname is required'),
  real_name: Yup.string().nullable(),
  origin_description: Yup.string().nullable(),
  superpowers: Yup.string().required('Superpowers field is required'),
  catch_phrase: Yup.string().nullable(),
})

const HeroUpdateForm = () => {
  const { id } = useParams()
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  const [hero, setHero] = useState(null)
  const [existingImages, setExistingImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3000/api/heroes/hero/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch hero')
        return res.json()
      })
      .then(data => {
        setHero(data.data)
        setExistingImages(data.data.images || [])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className={css.status}>Loading...</p>
  if (error) return <p className={css.status}>Error: {error}</p>
  if (!hero) return <p className={css.status}>No hero found</p>

  const handleSubmit = (values, helpers) => {
    const formData = new FormData()

    formData.append('nickname', values.nickname || '')
    formData.append('real_name', values.real_name || '')
    formData.append('origin_description', values.origin_description || '')
    formData.append('superpowers', values.superpowers || '')
    formData.append('catch_phrase', values.catch_phrase || '')


  selectedImages.forEach(file => {
    formData.append('images', file)
  })


  formData.append('keepImages', JSON.stringify(existingImages))

    fetch(`http://localhost:3000/api/heroes/update/${id}`, {
      method: 'PATCH',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        console.log('Server response:', data)
        helpers.resetForm()
        setSelectedImages([])
        if (fileInputRef.current) fileInputRef.current.value = null
        iziToast.success({
              title: 'Done',
              message: 'Hero updated successfully',
              position: 'topRight',
              timeout: 2000,
            })
              setTimeout(() => {
                  navigate('/')
                }, 2100)
       
      })
        .catch(() => {
              iziToast.error({
                title: 'Error',
                message: 'Error while creating a hero',
                position: 'topRight',
              })
            })
  }

  const handleImageChange = (e, setFieldValue) => {
    const files = Array.from(e.target.files)
    const updatedImages = [...selectedImages, ...files]
    setSelectedImages(updatedImages)
    setFieldValue('images', updatedImages)
  }

  const removeNewImage = (index, setFieldValue) => {
    const updated = selectedImages.filter((_, i) => i !== index)
    setSelectedImages(updated)
    setFieldValue('images', updated)
  }

  const removeExistingImage = index => {
    const updated = existingImages.filter((_, i) => i !== index)
    setExistingImages(updated)
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        nickname: hero.nickname || 'Classified',
        real_name: hero.real_name || 'Classified',
        origin_description: hero.origin_description || 'Classified',
        superpowers: hero.superpowers || 'Classified',
        catch_phrase: hero.catch_phrase || 'Classified',
        images: [],
      }}
      validationSchema={HeroSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={css.hero_form}>
          <label>Nickname</label>
          <Field type="text" name="nickname" />
          <ErrorMessage name="nickname" component="div" className="error" />

          <label>Real Name</label>
          <Field type="text" name="real_name" />
          <ErrorMessage name="real_name" component="div" className="error" />

          <label>Origin</label>
          <Field type="text" name="origin_description" />
          <ErrorMessage name="origin_description" component="div" className="error" />

          <label>Powers</label>
          <Field type="text" name="superpowers" />
          <ErrorMessage name="superpowers" component="div" className="error" />

          <label>Catchphrase</label>
          <Field type="text" name="catch_phrase" />
          <ErrorMessage name="catch_phrase" component="div" className="error" />

          <label>Upload Images</label>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={e => handleImageChange(e, setFieldValue)}
          />

          <div className={css.preview_container}>
            {existingImages.map((img, i) => (
              <div key={`old-${i}`} className={css.preview_item}>
                <img src={`http://localhost:3000${img}`} alt="hero" width="80" />
                <button type="button" onClick={() => removeExistingImage(i)}>✕</button>
              </div>
            ))}

            {selectedImages.map((file, i) => (
              <div key={`new-${i}`} className={css.preview_item}>
                <span>{file.name}</span>
                <button type="button" onClick={() => removeNewImage(i, setFieldValue)}>✕</button>
              </div>
            ))}
          </div>

          <button type="submit">Update Hero</button>
        </Form>
      )}
    </Formik>
  )
}

export default HeroUpdateForm
