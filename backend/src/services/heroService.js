import {Superhero} from '../db/models/SuperheroModel.js'

export const createHeroService = async (payload)=>{
    const hero = await Superhero.create(payload)
    return hero;
}

export const updateHeroService = async (instance,payload)=>{
    await instance.update(payload)
    return instance
}

export const deleteHeroService = async (instance)=>{
    await instance.destroy()
}

export const getHeroDetailsService = async (instance) =>{
   const {id,nickname,real_name,origin_description,superpowers,catch_phrase,images} = instance
   return{
    id,nickname,real_name,origin_description,superpowers,catch_phrase,images
   }
}