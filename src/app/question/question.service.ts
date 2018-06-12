import {Injectable} from '@angular/core';
import {Question} from './question.model';
import {Answer} from '../answer/answer.model';
import {Http, Headers, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class QuestionService{
    private questionsUrl:string;

    constructor(private http:Http){
        this.questionsUrl = urljoin(environment.apiUrl,'questions');
    }

    getQuestions():Promise<void | Question[]>{
        return this.http.get(this.questionsUrl)
            .toPromise()
            .then(response => response.json() as Question[])
            .catch(this.handleError);
    }

    getQuestion(id): Promise<void | Question>{
        const url = urljoin(this.questionsUrl,id);

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Question)
            .catch(this.handleError);
    }
    
    getToken(){
        return '?token=' + localStorage.getItem('token');
    }

    addQuestion(question: Question){
        const body = JSON.stringify(question);
        const headers = new Headers({'Content-Type':'application/json'});

        return this.http.post(this.questionsUrl + this.getToken(), body, { headers })
            .pipe(map((response: Response) => response.json())
                ,catchError((error: Response) => Observable.throw(error.json())));

/*
        return this.http.post(this.questionsUrl, body, { headers })
            .map((response:Response) => response.json())
            .catch((error:Response) => Observable.throw(error.json()));
*/
    }

    /*
    addAnswer(answer: Answer){
        const body = JSON.stringify(answer);
        const headers = new Headers({'Content-Type':'application/json'});
        const url = urljoin(this.questionsUrl, answer.question.id.toString(), 'answers');

        return this.http.post(url, body, { headers })
            .pipe(map((response: Response) => response.json())
                ,catchError((error: Response) => Observable.throw(error.json())));
    }
    */
    addAnswer(answer: Answer){
        const a = {
            descripcion:answer.descripcion,
            question:{
                id:answer.question.id
            }
        };
        const body = JSON.stringify(a);
        const headers = new Headers({'Content-Type':'application/json'});
        const url = urljoin(this.questionsUrl, answer.question.id.toString(), 'answers');

        return this.http.post(url + this.getToken(), body, { headers })
            .pipe(map((response: Response) => response.json())
                ,catchError((error: Response) => Observable.throw(error.json())));
    }

    handleError(error:any){
        const errMsg = error.message ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg);
    }
}