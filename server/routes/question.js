import express from 'express';
import {required,questionMiddleware} from '../middleware';
import {question} from '../db-api';
import {handleError} from '../utils';
import Debug from 'debug';

const app = express.Router();

// GET /api/questions
//app.get('/',(req,res) => res.status(200).json(questions));

// GET /api/questions
app.get('/', async (req, res) => {
    try{
        const {sort} = req.query;
        const questions = await question.findAll(sort);
        res.status(200).json(questions);
    }
    catch (err){
        handleError(err, res);
    }
})

// GET /api/questions/:id
app.get('/:id',questionMiddleware, async (req,res) => {
    try {
        res.status(200).json(req.question);
    }
    catch (err) {
        handleError(err, res);
    }
});

// POST /api/questions
app.post('/', required, async (req,res) => {
    const {title,description,icon} = req.body;
    const q = {
        title,
        description,
        icon,
        user: req.user._id
    };

    try {
        const savedQuestion = await question.create(q);

        res.status(201).json(savedQuestion);
    }
    catch (err) {
        handleError(err,res);
    }
    /*
    q.user = {
        email: 'luis@platzi.com',
        password: '123456',
        firstName: 'Luis',
        lastName: 'Rangel'
    };
    */

    /*
    const q = req.body;
    q.id = +new Date();
    q.user = req.user;
    q.createdAt = new Date();
    q.answers = [];
    questions.unshift(q);
    */
});

// POST /api/questions/:id/answers
app.post('/:id/answers', required, questionMiddleware, async (req, res) => {
    const a = req.body;
    const q = req.question;
    console.log(q);
    a.createdAt = new Date();
    //a.user = new User(req.user);
    a.user = req.user._id;
    try {
      const savedAnswer = await question.createAnswer(q, a);
      res.status(201).json(savedAnswer);
    } catch (error) {
      handleError(error, res);
    }
});

export default app;