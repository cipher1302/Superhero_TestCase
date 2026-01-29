import { createHeroService } from "../services/heroService.js"



export const createHeroController = async (req,res,next)=>{
   try {
     const answer = await createHeroService(req.body)

     res.status(201).json({
        status:201,
        message:"Hero successfully created",
        data: answer
     })
    
   } catch (error) {
        next(error)
   }
}