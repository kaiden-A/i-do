import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function hashedPassword(pasword){

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(pasword , salt);

    return hashPass;
}

async function comparePassword(password , hashPass){

    return await bcrypt.compare(password , hashPass)
    
}

const maxAge = 1 * 24 * 60 * 60;

function createToken(id){
    return jwt.sign({id : id} , process.env.JWT_SECRET , {expiresIn : maxAge})
}

export const post_login = async (req , res) => {

    const {userId , password} = req.body;
    const db = req.app.locals.db;

    try{

        const [rows] = await db.query(
            'SELECT * FROM USERS WHERE user_id = ?',
            [userId]
        )

        if(rows.length === 0){
            return res.status(401).json({error : true , msg : 'User Doesnt Exist'});
        }

        const isPassword = await comparePassword(password , rows[0].hash_password);

        if(!isPassword){
            return res.status(401).json({error : true , msg : 'Incorrect Password'});
        }


        const token = createToken(userId);

        res.cookie('jwt' , token , {   
            httpOnly : true , 
            maxAge : maxAge * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
        } );

        res.json({success : true , msg : `Hello ${rows[0].user_name}`});



    }catch(err){
        console.log(err);
    }

}


export const post_signup = async (req , res) => {

    const {userId , name , email , password } = req.body;
    const db = req.app.locals.db;

    try{

        const hashPass = await hashedPassword(password);
        const createdAt = new Date();

        const [result] = await db.query(
            'INSERT INTO USERS VALUES(? , ? , ? , ? , ?)' , 
            [userId , name , email , hashPass , createdAt]
        );

        if(result.affectedRows === 0 ){
            return res.status(401).json({error : true , msg : 'Fail to Create User'})
        }

        const token = createToken(userId);

        res.cookie('jwt' , token , {   
            httpOnly : true , 
            maxAge : maxAge * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
        } );

        res.json({success : true , msg : 'Successfully create user'});

    }catch(err){
        console.log(err);
        res.status(500).json({error: true , msg : 'Database Error'})
    }
}

export const get_logout = (req , res) => {
    res.cookie('jwt' , {maxAge : 1})
}