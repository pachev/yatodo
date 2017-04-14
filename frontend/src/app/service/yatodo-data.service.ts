import { Injectable ,OnInit} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Todo} from '../models/todo';
import {TodoGroup} from '../models/todo-group';
import {AuthService} from './auth.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class YatodoDataService {

    // Placeholder for last id so we can simulate
    // automatic incrementing of id's
    lastId: number = 0;

    // Placeholder for todo's
    todos: Todo[] = [];


    constructor(
        private http: Http,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.authService.login("pachev", "password")
        .subscribe(result => {
            if (result === true) {
                // login successful
                this.userToken = this.authService.token;
                console.log("userToken: ", this.userToken);
            } else {
                // login failed
                console.log("something went wrong")
                this.userToken = "";
            }
        });
    }

    

    // private instance variable to hold base url
    // TODO: grab settings from a config file 
    private baseUrl = 'http://localhost:8000/api/items'; 
    private userToken: String;

    getItems() : Observable<any>{

        let token = 'Token eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYWNoZXYiLCJyb2xlcyI6W10sImlhdCI6MTQ5MjE5NDUzM30.F1db98EUVR42M2-uvsKCmHQFRouo9rtSgTWWFjz2ytA';
        let headers = new Headers();
        headers.append('authentication', token);
        console.log(headers)
        let options = new RequestOptions({ headers: headers }); // Create a request option

        this.http.get("http://localhost:8000/api/items", options)

        // ...using get request
        return this.http.get(this.baseUrl, options)
        // ...and calling .json() on the response to return data
        .map((res:Response) => { 
            console.log("trying to get respons");
            return res.json() ;
        })
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }
    // Add a new item
    addItem (body: Object): Observable<Todo[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Authorization': 'Token ' + this.userToken});
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.baseUrl, body, options) // ...using post request
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   

    // Update a item
    updateItem (body: Object): Observable<Todo[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Authorization': 'Token ' + this.userToken});
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.patch(`${this.baseUrl}/${body['id']}`, body, options) // ...using put request
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   

    // Delete a item
    removeItem (id:number): Observable<Todo[]> {
        let headers = new Headers({ 'Authorization': 'Token ' + this.userToken});
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.delete(`${this.baseUrl}/${id}`) // ...using put request
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    } 

}

