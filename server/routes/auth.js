import express from 'express';
import Debug from 'debug';
import jwt from 'jsonwebtoken';
import {secret} from '../config';
//import { users, findUserByEmail } from '../middleware';
import {User} from '../models';
import {
    hashSync as hash,
    compareSync as comparePasswords
} from 'bcryptjs';

const app = express.Router();
const debug = new Debug('platzi-overflow:auth');

// /api/auth/signin
app.post('/signin', async (req,res,next) => {
    const {email,password} = req.body;
    //const user = findUserByEmail(email);
    const user = await User.findOne({email});

    if (!user){
        debug(`User with email ${email} not found`);
        return handleLoginFailed(res);
    }

    if (!comparePasswords(password,user.password)){
        debug(`Passwords do not match: ${password} !== ${user.password}`);
        return handleLoginFailed(res ,'La contraseña no coincide.');
    }


    //const token = jwt.sign({user},secret,{expiresIn:86400});
    const token = createToken(user);

    res.status(200).json({
        message:'Login succeded',
        token,
        userId:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email
    });
});

const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 86400 });

// /api/auth/signup
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password} = req.body;
    const u = new User({
        firstName, 
        lastName, 
        email, 
        password : hash(password,10)
    });

    debug(`Creating new user ${u}`);
    const user = await u.save();

    const token = createToken(user);
    res.status(201).json({
        message:'User Saved',
        token,
        id:user.id,
        firstName,
        lastName,
        email
    });
})

function handleLoginFailed(res, message ) {
    return res.status(401).json({
      message: 'Login failed',
      error: message || 'Email and password don\'t match'
    });
}

export default app;