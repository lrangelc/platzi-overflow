import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Question} from './question.model';
import icons from './icons';

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
    `]
})

export class QuestionFormComponent{
    icons: Object[] = icons;

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
    }
}