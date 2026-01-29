import { createHeroService,updateHeroService,deleteHeroService } from "../services/heroService.js"



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


export const updateHeroController = async (req,res,next)=>{
   try {
      const answer = await updateHeroService(req.instance, req.body)
      res.status(200).json({
         status:200,
         message:"Successfully updated your hero",
         data:answer

      })

   } catch (error) {
      next(error)
   }
}


export const deleteHeroController = async (req,res,next)=>{
   try {
      
      await deleteHeroService(req.instance)
      return res.status(204).send()

   } catch (error) {
      next(error)
   }
}