import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useId } from 'react'
import * as Yup from 'yup'


const HeroSchema = Yup.object().shape(
  {
  nickname: Yup.string()
    .min(1, 'Must be at least 1 character')
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

//   images: Yup.array()
//     .of(Yup.string())
//     .nullable()
}

)

const HeroForm = () => {

    const fieldId = useId()


    const handleSumbit = (values,helpers)=>{
        console.log(values)
        helpers.resetForm()
    }

  return (
  <Formik initialValues={{
    nickname: "Classified",
    real_name: "Classified",
    origin: "Classified",
    powers: "Classified",
    catch_phrase:"Classified",
    // images:"Classified",
  }} onSubmit={handleSumbit} validationSchema={HeroSchema}>
    <Form action="">
        <label htmlFor="">Your Superhero's Nickname</label>
        <Field type="text" name="nickname" />
        <ErrorMessage name="nickname" />

        <label htmlFor="">Your Superhero's Real Name</label>
        <Field type="text" name="real_name" />
        <ErrorMessage name="real_name" />

        <label htmlFor="">Your Superhero's Origin</label>
        <Field type="text" name="origin" />
        <ErrorMessage name="origin" />

        <label htmlFor="">Your Superhero's Powers</label>
        <Field type="text" name="powers" />
        <ErrorMessage name="powers" />

        <label htmlFor="">What is your superhero's catchphrase?</label>
        <Field type="text" name="catch_phrase" />
        <ErrorMessage name="catch_phrase" />

        {/* <label htmlFor="">Superhero Images</label>
        <Field type="text" name="images" /> */}



        <button type="submit">Submit</button>
    </Form>
  </Formik>
  )
}

export default HeroForm