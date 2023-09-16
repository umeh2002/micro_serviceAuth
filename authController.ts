import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuid } from "uuid";


const prisma = new PrismaClient()

export const register =async(req:Request, res:Response)=>{
    try {
      const {name, email,password} = req.body
      const salt:any = await bcrypt.genSalt(10)
      const hash:any = await bcrypt.hash(password, salt)

      const user = await prisma.authModel.create({
        data:{
            name, email, password:hash
        }
      })
      return res.status(201).json({
        message:"registration successfully",
        data:user
    })
    } catch (error:any) {
        return res.status(404).json({
            message:"error",
            data:error.message
        })
    }
}

export const signIn =async(req:Request, res:Response)=>{
    try {
        const {email, password}=req.body
        const mail = await prisma.authModel.findUnique({
            where: { email },
          });
          const  hash = await bcrypt.compare(password, mail?.password!)

          if (mail) {
            if (hash) {
                const token =  jwt.sign({id:mail.id}, "secret")

                const newToken = `${uuid()}%${token}`

                // const newToken = `${uuid()}%${token}`

                req.headers.authorization = `Bearer ${newToken}`

                return res.status(201).json({
                    message:"success",
                    data:newToken
                })
            } else {
                return res.status(404).json({
                    message:"token not available",
                 
                })    
            }
          } else {
            return res.status(404).json({
                message:"user not signed in",
             
            }) 
          }
    } catch (error:any) {
        return res.status(404).json({
            message:"error",
            data:error.message
        })  
    }
}

export const getAll =async (req: Request, res: Response)=>{
    try {
        const user = await prisma.authModel.findMany({})

        return res.status(200).json({
            message:"success",
            data:user
        })
    } catch (error:any) {
        return res.status(404).json({
            message:"error",
            data:error.message
        })  
    }
}