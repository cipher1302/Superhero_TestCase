import { Router } from "express";
import {createHeroController,updateHeroController,deleteHeroController,getHeroDetailsController, getAllHeroesController} from '../controllers/heroController.js'
import { validateBodyCreate } from "../middlewares/validateBodyCreate.js";
import { Superhero } from "../db/models/SuperheroModel.js";
import { validateBodyPatch } from "../middlewares/validateBodyPatch.js";
import {validateId} from "../middlewares/validateId.js"

const router = Router()

router.get('/',getAllHeroesController);
router.post('/create',validateBodyCreate(Superhero),createHeroController)
router.patch('/update/:id',validateId(Superhero),validateBodyPatch(Superhero),updateHeroController)
router.delete('/delete/:id',validateId(Superhero),deleteHeroController)
router.get('/hero/:id',validateId(Superhero),getHeroDetailsController)



export default router