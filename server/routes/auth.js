import express from 'express';
import Debug from 'debug';
import jwt from 'jsonwebtoken';

const app = express.Router();
const debug = new Debug('platzi-overflow:auth');
const secret = 'miclavesecreta';

const users = [{
    firstName: 'Sacha',
    lastName: 'Lifszyc',
    email:'sacha@platzi.com',
    password:'123456',
    id:123
}];

const findUserByEmail = e => users.find(({ email }) => email === e);

function comparePasswords(providesPassword, userPassword){
    return providesPassword === userPassword;
}

// /api/auth/signin
app.post('/signin',(req,res,next) => {
    const {email,password} = req.body;
    const user = findUserByEmail(email);

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
app.post('/signup', (req, res) => {
    const { firstName, lastName, email, password} = req.body;
    const user = {
        id:+new Date(),
        firstName,
        lastName,
        email,
        password
    };
    debug(`Creating new user ${user}`);
    users.push(user);
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