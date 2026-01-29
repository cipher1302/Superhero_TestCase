import createHttpError from 'http-errors';

export const validateBodyCreate = (model) => (req,res,next) => {

    const missingFields = []
    try {
        
    Object.entries(model.rawAttributes).forEach(([field, attr]) => {
      if (['createdAt', 'updatedAt'].includes(field)) return; 
      if (attr.allowNull === false && (req.body[field] === null || req.body[field] === undefined)) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      const error = createHttpError(
        400,
        `Validation error: Missing required fields: ${missingFields.join(', ')}`
      );
      return next(error);
    }

    next();


    } catch (error) {
        next(error)
    }
}