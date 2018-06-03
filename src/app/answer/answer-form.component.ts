import { Component, Input } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Answer } from './answer.model';
import { Question } from '../question/question.model';
import { User} from '../auth/user.model';

@Component({
    selector:'app-answer-form',
    templateUrl:'./answer-form.component.html',
    styles:[`
        form{
            margin-top: 20px;
        }
    `]
})

export class AnswerFormComponent{
    @Input() question: Question;

    onSubmit(form:NgForm){
        console.log(form.value.description);
        const answer = new Answer(form.value.description
            ,this.question
            ,new Date()
            ,new User(null,null,'Paula','Becerra'));
        this.question.answers.unshift(answer);
        form.reset();
    }
}