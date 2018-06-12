import express from 'express';
import {
    required,
    questionMiddleware,
    questionsMiddleware,
    questions
  } from '../middleware'
    
const app = express.Router();

// GET /api/questions
//app.get('/',(req,res) => res.status(200).json(questions));

// GET /api/questions
app.get('/', questionsMiddleware, (req, res) => res.status(200).json(req.questions));
/*
app.get('/', questionsMiddleware, (req,res) =>{
        setTimeout(() => {
            res.status(200).json(req.questions);
        },0);
    } 
);
*/

// GET /api/questions/:id
app.get('/:id',questionMiddleware, (req,res) => {
    /*
        const idx = req.params.id;
        const q = questions.find(qq => qq.id === +idx);
        res.status(200).json(q);
    */
        res.status(200).json(req.question);
    } 
);

// POST /api/questions
app.post('/', required, (req,res) => {
    const q = req.body;
    q.id = +new Date();
    /*
    q.user = {
        email: 'luis@platzi.com',
        password: '123456',
        firstName: 'Luis',
        lastName: 'Rangel'
    };
    */
    q.user = req.user;
    q.createdAt = new Date();
    q.answers = [];
    questions.unshift(q);
    res.status(201).json(q);
});

// POST /api/questions/:id/answers
app.post('/:id/answers', required, questionMiddleware, (req, res) => {
    const answer = req.body;
    const q = req.question;
    answer.createdAt = new Date();
    answer.user = req.user;
    q.answers.push(answer);
    res.status(201).json(answer);
  });
/*
app.post('/:id/answers',questionMiddleware, userMiddleware, (req,res) => {
    const answer = req.body;
    const q = req.question;
    answer.createdAt = new Date();
    answer.user = req.user;
    q.answer.push(answer);
    res.status(201).json(answer);
})
*/

export default app;