import {Superhero} from '../db/models/SuperheroModel.js'

export const createHeroService = async (payload)=>{
    const hero = await Superhero.create(payload)
    return hero;
}