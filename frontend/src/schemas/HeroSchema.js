import * as Yup from 'yup'

export const HeroSchema = Yup.object().shape(
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