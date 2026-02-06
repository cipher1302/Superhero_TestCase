import { Router } from 'express';
import {
  createHeroController,
  updateHeroController,
  deleteHeroController,
  getHeroDetailsController,
  getAllHeroesController,
} from '../controllers/heroController.js';
import { validateBodyCreate } from '../middlewares/validateBodyCreate.js';
import { Superhero } from '../db/models/SuperheroModel.js';
import { validateBodyPatch } from '../middlewares/validateBodyPatch.js';
import { validateId } from '../middlewares/validateId.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.get('/', getAllHeroesController);
router.post('/', upload.array('images', 3), validateBodyCreate(Superhero), createHeroController);
router.patch(
  '/:id',
  upload.array('images', 3),
  validateId(Superhero),
  validateBodyPatch(Superhero),
  updateHeroController,
);
router.delete('/:id', validateId(Superhero), deleteHeroController);
router.get('/:id', validateId(Superhero), getHeroDetailsController);

export default router;
