import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import pool from '../database/database.js';

async function hashedPassword(pasword){

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(pasword , salt);

    return hashPass;
}

async function comparePassword(password , hashPass){

    return await bcrypt.compare(password , hashPass)
    
}

const minAge = 3 * 24 * 60 * 60;
const maxAge = 30 * 24 * 60 * 60;
function createToken(id){
    return jwt.sign({id : id} , process.env.JWT_SECRET , {expiresIn : maxAge})
}

export const post_login = catchAsync( async (req , res) => {

    const {email , password , remember} = req.body;

    

    const [rows] = await pool.query(
        'SELECT * FROM USERS WHERE email = ?',
        [email]
    )

    if(rows.length === 0){
        throw new AppError("User Doesnt Exist" , 401);
    }

    const isPassword = await comparePassword(password , rows[0].hash_password);

    if(!isPassword){
        throw new AppError("Incorrect Password" , 400);
    }


    const token = createToken(rows[0].user_id);

    res.cookie('jwt' , token , {   
        httpOnly : true , 
        maxAge : remember ? maxAge * 1000 : minAge * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
    } );

    res.json({success : true , msg : `Hello ${rows[0].user_name}`});


})


export const post_signup = catchAsync(async (req , res) => {

    const {userId , name , email , password } = req.body;


    const hashPass = await hashedPassword(password);
    const createdAt = new Date();

    const [row] = await pool.query(
        'SELECT * FROM USERS WHERE email = ?',
        [email]
    );

    if(row.length !== 0){
        throw new AppError("Email Already Exist" , 400);
    }

    const [result] = await pool.query(
        'INSERT INTO USERS(user_id , user_name , email , hash_password , created_at) VALUES(? , ? , ? , ? , ?)' , 
        [userId , name , email , hashPass , createdAt]
    );

    if(result.affectedRows === 0 ){
        throw new AppError("Fail to create User" , 400);
    }

    const token = createToken(userId);

    res.cookie('jwt' , token , {   
        httpOnly : true , 
        maxAge : minAge * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
    } );

    res.json({success : true , msg : 'Successfully create user'});

    
})

export const get_logout = (req , res) => {
    res.cookie('jwt' , {maxAge : 1})
}