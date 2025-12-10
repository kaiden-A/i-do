import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

async function hashedPassword(pasword){

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(pasword , salt);

    return hashPass;
}

async function comparePassword(password , hashPass){

    return await bcrypt.compare(password , hashPass)
    
}

const maxAge = 3 * 24 * 60 * 60;

function createToken(id){
    return jwt.sign({id : id} , process.env.JWT_SECRET , {expiresIn : maxAge})
}

export const post_login = catchAsync( async (req , res) => {

    const {userId , password} = req.body;
    const db = req.app.locals.db;

    

    const [rows] = await db.query(
        'SELECT * FROM USERS WHERE user_id = ?',
        [userId]
    )

    if(rows.length === 0){
        throw new AppError("User Doesnt Exist" , 401);
    }

    const isPassword = await comparePassword(password , rows[0].hash_password);

    if(!isPassword){
        throw new AppError("Incorrect Password" , 400);
    }


    const token = createToken(userId);

    res.cookie('jwt' , token , {   
        httpOnly : true , 
        maxAge : maxAge * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
    } );

    res.json({success : true , msg : `Hello ${rows[0].user_name}`});


})


export const post_signup = catchAsync(async (req , res) => {

    const {userId , name , email , password } = req.body;
    const db = req.app.locals.db;

    const hashPass = await hashedPassword(password);
    const createdAt = new Date();

    const [result] = await db.query(
        'INSERT INTO USERS VALUES(? , ? , ? , ? , ?)' , 
        [userId , name , email , hashPass , createdAt]
    );

    if(result.affectedRows === 0 ){
        throw new Error("Fail to create User" , 400);
    }

    const token = createToken(userId);

    res.cookie('jwt' , token , {   
        httpOnly : true , 
        maxAge : maxAge * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
    } );

    res.json({success : true , msg : 'Successfully create user'});

    
})

export const get_logout = (req , res) => {
    res.cookie('jwt' , {maxAge : 1})
}