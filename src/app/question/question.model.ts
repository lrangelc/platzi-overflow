import { Answer } from '../answer/answer.model';

export class Question {
    id?:string;
    title:string;
    description:string;
    createdAt?:Date;
    icon?:string;
    answers: Answer[]

    constructor(title:string
        ,description:string
        ,createdAt?:Date
        ,icon?:string)
    {
        this.id = '1';
        this.description = description;
        this.title = title;
        this.createdAt = createdAt;
        this.icon = icon;
        this.answers = [];
    }
}