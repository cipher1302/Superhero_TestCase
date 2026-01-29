import createHttpError from 'http-errors';
import { validate as isUuid } from 'uuid';

export const validateId = (model) => async (req,res,next) =>{
    const {id} = req.params;
    
     if (!isUuid(id)) {
    return next(createHttpError(400, "Invalid UUID"));
  }
    try {
        const idFound = await model.findByPk(id)
        if(!idFound){
            return next(createHttpError(404,'Hero not found'))
        }

        req.instance = idFound
    
        next()
    } catch (error) {
        next(error)
    }

}