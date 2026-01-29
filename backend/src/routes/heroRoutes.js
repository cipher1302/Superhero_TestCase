import { Router } from "express";
import {createHeroController} from '../controllers/heroController.js'
import { validateBody } from "../middlewares/validateBody.js";
import { Superhero } from "../db/models/SuperheroModel.js";

const router = Router()

router.post('/create',validateBody(Superhero),createHeroController)


export default router