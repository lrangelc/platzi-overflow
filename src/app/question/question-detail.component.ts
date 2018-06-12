import { Component,OnInit,OnDestroy } from '@angular/core';
import { Question } from './question.model';
import {QuestionService} from './question.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector:'app-question-detail',
    templateUrl:'./question-detail.component.html',
    styleUrls:['./question-detail.component.css'],
    providers:[QuestionService]
})

export class QuestionDetailComponent implements OnInit, OnDestroy {
    /*
    question: Question = new Question('Esta es una nueva pregunta sobre Android'
        ,'tengo una duda con una aplicacion que estoy desarrollando'
        ,new Date
        ,'devicon-android-plain');
    */
    question?:Question;
    loading= true;
    sub:any;

    constructor(private questionSevice:QuestionService,
        private route:ActivatedRoute){

    }

    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
            this.questionSevice
                .getQuestion(params.id)
                .then((question:Question) => {
                    this.question = question;
                    this.loading = false;
                });
        });
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }
}