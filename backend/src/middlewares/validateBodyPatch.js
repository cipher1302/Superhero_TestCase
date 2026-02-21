import createHttpError from 'http-errors';

export const validateBodyPatch = (model) => (req, res, next) => {
  const errors = [];

  try {
    Object.entries(req.body).forEach(([field, value]) => {
      const attr = model.rawAttributes[field];
      // if the field in the model does not exist just ignore it
      if (!attr) return;

      if (attr.allowNull === false && value === null) {
        errors.push(field);
      }
    });

    if (errors.length > 0) {
      return next(
        createHttpError(400, `Validation error: Fields cannot be null: ${errors.join(', ')}`),
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
