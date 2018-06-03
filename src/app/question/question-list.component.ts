import { Component } from "@angular/core";
import { Question } from './question.model';

const q = new Question('Como reutilizar un componente en Android?'
    ,'Esta es una pregunta...'
    ,new Date()
    ,'none'
);

@Component({
    selector:'app-question-list',
    templateUrl:'./question-list.component.html',
    styles:[`
        i{
            font-size:48px;
        }
        i.help{
            width: 48px !important;
            height: 48px !important;
            padding:0 !important;
            font-size:48px !important;
        }
        .add-question{
            position: fixed;
            bottom:30px;
            right:30px;
            font-size:32px;
        }
    `]

})

export class QuestionListComponent{
    questions: Question[] = new Array(10).fill(q);
}