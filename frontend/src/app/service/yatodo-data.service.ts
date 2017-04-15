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


    // private instance variable to hold base url
    // TODO: grab settings from a config file 
    private baseUrl = 'http://localhost:8000/api/items'; 

    getItems() : Observable<any>{

        let headers = new Headers({ 'Authorization': 'Token '+this.authService.token});
        let options = new RequestOptions({ headers: headers }); // Create a request option

        // ...using get request
        return this.http.get(this.baseUrl, options)
        // ...and calling .json() on the response to return data
        .map((res:Response) => { 
            return res.json() ;
        })
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }
    // Add a new item
    addItem (body: Object): Observable<any> {
        console.log("gonna add todo")
        let headers = new Headers({ 'Authorization': 'Token '+this.authService.token});
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.baseUrl, body, options) // ...using post request
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   

    // Update a item
    updateItem (url: string, body: Object): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Token '+this.authService.token});
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.patch(url, body, options) // ...using put request
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   

    // Delete a item
    removeItem (url: string): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Token '+this.authService.token});
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.delete(url,options) // ...using put request
        .map((res:Response) => true) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    } 

}

