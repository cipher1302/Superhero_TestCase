import { testSevice } from "../services/heroService.js"


export const testController = async (req,res)=>{
    try {
        const answer = await testSevice()
        res.status(200).json({
            status:200,
            data: answer
        })
    } catch (error) {
        next(error)
    }

}