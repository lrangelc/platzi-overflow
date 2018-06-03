import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Question} from './question.model';
import icons from './icons';
import {QuestionService} from './question.service';
import {Router} from '@angular/router';

@Component({
    selector:'app-question-form',
    templateUrl:'./question-form.component.html',
    styles:[`
        i {
            font-size:48px;
        }
        small{
            display:block;
        }
    `],
    providers:[QuestionService]
})

export class QuestionFormComponent{
    icons: Object[] = icons;

    constructor(private questionService:QuestionService,
        private router:Router){

    }

    getIconVersion(icon:any)
    {
        let version = icon.versions.font[0];

        if(icon.name=='illustrator')
        {
            version = icon.versions.svg[0];
        }
        else
        {
            if (icon.versions.font.includes('plain-wordmark'))
            {
                version = 'plain-wordmark';
            }            
        }

        return version;
    }

    onSubmit(form:NgForm)
    {
        const q = new Question(
            form.value.title,
            form.value.description,
            new Date(),
            form.value.iconK
        );
        console.log(q);
        this.questionService.addQuestion(q)
            .subscribe(
                ({id}) => this.router.navigate(['/questions',id]),
                error => console.log(error)
            );
    }
}