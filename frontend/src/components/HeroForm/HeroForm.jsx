import React, {useRef} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useId, useState } from 'react'
import * as Yup from 'yup'
import css from '../HeroForm/HeroForm.module.css'

const HeroSchema = Yup.object().shape(
  {
  nickname: Yup.string()
    .min(2, 'Must be at least 2 character')
    .max(20, 'Must be at most 20 characters')
    .required('Nickname is required'),

  real_name: Yup.string()
    .min(1, 'Must be at least 1 character')
    .max(20, 'Must be at most 20 characters')
    .nullable(),

  origin_description: Yup.string()
    .nullable(),

  superpowers: Yup.string()
    .required('Superpowers field is required'),

  catch_phrase: Yup.string()
    .min(2, 'Must be at least 2 characters')
    .max(30, 'Must be at most 30 characters')
    .nullable(),
}

)

const HeroForm = () => {
    const fileInputRef = useRef(null)



    const handleSubmit = (values,helpers)=>{
        const formData = new FormData()
        formData.append('nickname', values.nickname)
        formData.append('real_name', values.real_name)
        formData.append('origin_description', values.origin_description)
        formData.append('superpowers', values.superpowers)
        formData.append('catch_phrase', values.catch_phrase)
         if (values.images && values.images.length > 0) {
      Array.from(values.images).forEach(file => {
        formData.append('images', file)
      })
    } 
         fetch('http://localhost:3000/api/heroes/create', {
            method: 'POST',
            body: formData,
          })
          .then(res => res.json())
          .then(data => {
            console.log('Server response:', data)
            helpers.resetForm()
            setSelectedImages([])
            if (fileInputRef.current) fileInputRef.current.value = null
          })
          .catch(err => console.error('Error:', err))
      }
        

    const [selectedImages, setSelectedImages] = useState([])

   
  const handleImageChange = (e, setFieldValue) => {
  const files = Array.from(e.target.files) 
  const updatedImages = [...selectedImages, ...files]

  setSelectedImages(updatedImages)        
  setFieldValue('images', updatedImages)  
}

const removeImage = (index, setFieldValue) => {
  const updated = selectedImages.filter((_, i) => i !== index)
  setSelectedImages(updated)                  
  setFieldValue('images', updated)          
}

   return (
    <Formik
      initialValues={{
        nickname: "Classified",
        real_name: "Classified",
        origin_description: "Classified",
        superpowers: "Classified",
        catch_phrase: "Classified",
        images: [] 
      }}
      validationSchema={HeroSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={css.hero_form}>
          <label>Nickname</label>
          <Field type="text" name="nickname" />
          <ErrorMessage name="nickname" component="div" className="error"/>

          <label>Real Name</label>
          <Field type="text" name="real_name" />
          <ErrorMessage name="real_name" component="div" className="error" />

          <label>Origin</label>
          <Field type="text" name="origin_description" />
          <ErrorMessage name="origin_description" component="div" className="error"/>

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
            onChange={(e) => handleImageChange(e, setFieldValue)}
          />
          <div className={css.preview_container}>
          {selectedImages.map((file, index) => (
  <div key={index} className={css.preview_item}>
    <span>{file.name}</span> 
    <button type="button" onClick={() => removeImage(index, setFieldValue)}>✕</button>
  </div>
))}
    </div>
        <button type="submit">Create Hero</button>
        </Form>
      )}
    </Formik>
  )
}
  

export default HeroForm