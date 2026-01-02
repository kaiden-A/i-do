import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import pool from '../database/database.js';

export default async function requireAuth(req , res , next){

    const token = req.cookies.jwt;

    try{

        const decodedToken = jwt.verify(token , process.env.JWT_SECRET);

        if(!decodedToken){
            return next(new AppError('Authentication token missing' , 401))
        }

        const [rows]= await pool.query(`SELECT user_id , user_name FROM USERS WHERE user_id = ? ` ,
            [decodedToken.id]
        )

        if(rows.length === 0){
            return next(new AppError("User Not Found" , 401))
        }

        req.user = rows[0];
        next();

    }catch(err){
        
        return next(new AppError('Invalid or expired token' , 401))
    }
}