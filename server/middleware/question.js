const question = {
    id:1,
    title: 'hola! como reutilizo un componente en android?',
    description: 'Miren esta es mi pregunta',
    createdAt: new Date(),
    icon: 'devicon-android-plain',
    answers: [],
    user:{
        firstName: 'Sacha',
        lastName: 'Lifszyc',
        email:'sacha@platzi.com',
        password:'123456'
    }
};

export const questions = new Array(10).fill(question);

export const questionsMiddleware = (req, res, next) => {
    req.questions = questions;
    next();
}

export const questionMiddleware = (req,res,next) => {
    const idx = req.params.id;
    req.question = questions.find(qq => qq.id === +idx);
    next();
}