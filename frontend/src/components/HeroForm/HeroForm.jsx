import  {useRef} from 'react'
import { useState } from 'react'
import css from '../HeroForm/HeroForm.module.css'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { HeroSchema } from '../../schemas/HeroSchema.js'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'





const HeroForm = () => {  
   const {handleSubmit,register,reset,setValue,formState:{errors}} = useForm({ defaultValues: {
      nickname: 'Classified',
      real_name: 'Classified',
      origin_description: 'Classified',
      superpowers: 'Classified',
      catch_phrase: 'Classified',
      images: []
    },
    resolver: yupResolver(HeroSchema),
  })
    const fileInputRef = useRef(null)
    const onSubmit = (values)=>{
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
             console.log('FormData contents:')
for (let [key, value] of formData.entries()) {
  console.log(key, value)
}
    } 
         fetch('http://localhost:3000/api/heroes/', {
            method: 'POST',
            body: formData,
          })
          .then(res => res.json())
          .then(data => {
            console.log('Server response:', data)
            reset()
            setSelectedImages([])
            if (fileInputRef.current) fileInputRef.current.value = null
          
            iziToast.success({
              title: 'Done',
              message: 'Hero created successfully',
              position: 'topRight',
              timeout: 2000,
            })

            //  setTimeout(() => {
            //       window.location.reload()
            //     }, 2100)
          })
          .catch(() => {
              iziToast.error({
                title: 'Error',
                message: 'Error while creating a hero',
                position: 'topRight',
              })
            })
            
      }
        

    const [selectedImages, setSelectedImages] = useState([])

   
  const handleImageChange = (e) => {
  const files = Array.from(e.target.files) 
  const updatedImages = [...selectedImages, ...files]

  setSelectedImages(updatedImages)        
  setValue('images', updatedImages)  
}

const removeImage = (index) => {
  const updated = selectedImages.filter((_, i) => i !== index)
  setSelectedImages(updated)                  
  setValue('images', updated)          
}

   return (
   
        <form className={css.hero_form} onSubmit={handleSubmit(onSubmit)}>
          <label>Nickname</label>
          <input type="text" name="nickname" {...register("nickname")}/>
          {errors.nickname && <div className={css.error}>{errors.nickname.message}</div>}

          <label>Real Name</label>
          <input type="text" name="real_name" {...register("real_name")} />
          {errors.real_name && <div className={css.error}>{errors.real_name.message}</div>}

          <label>Origin</label>
          <input type="text" name="origin_description" {...register("origin_description")}/>
          {errors.origin_description && <div className={css.error}>{errors.origin_description.message}</div>}

          <label>Powers</label>
          <input type="text" name="superpowers" {...register("superpowers")} />
          {errors.superpowers && <div className={css.error}>{errors.superpowers.message}</div>}

          <label>Catchphrase</label>
          <input type="text" name="catch_phrase" {...register("catch_phrase")} />
          {errors.catch_phrase && <div className={css.error}>{errors.catch_phrase.message}</div>}

          <label>Upload Images</label>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <div className={css.preview_container}>
          {selectedImages.map((file, index) => (
  <div key={index} className={css.preview_item}>
    <span>{file.name}</span> 
    <button type="button" onClick={() => removeImage(index)}>✕</button>
  </div>
))}
    </div>
        <button type="submit">Create Hero</button>
        </form>
      
  )
}
export default HeroForm