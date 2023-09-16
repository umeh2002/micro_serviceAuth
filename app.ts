import express, { Application,Request,Response } from "express"
import cors from 'cors'
import router from "./authRouter"


export const mainApp = (app:Application)=>{
app.use(express.json())
app.use(cors())

app.get("/", (req:Request, res:Response)=>{
try {
    return res.status(200).json({
        message:"welcome back"
    })
} catch (error:any) {
    return res.status(404).json({
        message:"error"
    })
}
})

app.use("/api", router)
}