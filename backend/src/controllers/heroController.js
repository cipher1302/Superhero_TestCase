import {
  createHeroService,
  updateHeroService,
  deleteHeroService,
  getHeroDetailsService,
  getAllHeroesService,
} from '../services/heroService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createHeroController = asyncHandler(async (req, res) => {
  const filePath = req.files?.map((file) => `/uploads/${file.filename}`) || null;
  const payload = {
    ...req.body,
    images: filePath,
  };

  const answer = await createHeroService(payload);

  res.status(201).json({
    status: 201,
    message: 'Hero successfully created',
    data: answer,
  });
});

export const updateHeroController = asyncHandler(async (req, res) => {
  const keepImages = req.body.keepImages ? JSON.parse(req.body.keepImages) : [];

  const newImages = req.files?.map((file) => `/uploads/${file.filename}`) || [];

  const finalImages = [...keepImages, ...newImages];

  const payload = {
    ...req.body,
    images: finalImages,
  };

  const answer = await updateHeroService(req.instance, payload);
  res.status(200).json({
    status: 200,
    message: 'Successfully updated your hero',
    data: answer,
  });
});

export const deleteHeroController = asyncHandler(async (req, res) => {
  await deleteHeroService(req.instance);
  return res.status(204).send();
});

export const getHeroDetailsController = asyncHandler(async (req, res) => {
  const answer = await getHeroDetailsService(req.instance);
  return res.status(200).json({
    status: 200,
    message: 'More about this hero',
    data: answer,
  });
});

export const getAllHeroesController = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const answer = await getAllHeroesService({ page, limit });
  return res.status(200).json({
    status: 200,
    message: 'List of all your heroes',
    data: answer,
  });
});
