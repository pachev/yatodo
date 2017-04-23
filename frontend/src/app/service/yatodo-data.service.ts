import { Injectable ,OnInit} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Todo} from '../models/todo';
import {TodoGroup} from '../models/todo-group';
import {AuthService} from './auth.service';
import {Settings} from '../settings'

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class YatodoDataService {

    count = 0;
    constructor(
        private http: Http,
        private authService: AuthService,
        private settings: Settings
    ) { }


    private baseUrl = this.settings.baseUserUrl; 
    private itemUrl = this.settings.itemUrl;
    private groupUrl = this.settings.groupUrl;
    private groupCountUrl = this.settings.groupCountUrl;;


    //Retrieving all Todos
    getItems() : Observable<any>{

        let headers = new Headers({ 'Authorization': 'Token '+this.authService.token});
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.get(this.baseUrl + `${localStorage.getItem("currentUserId")}/items`, options)
        .map((res:Response) => { 
            return res.json() ;
        })
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

    //Retrieving all Todos in a certain group
    getGroupItems(url: string) : Observable<any>{

        let headers = new Headers({ 'Authorization': 'Token '+this.authService.token});
        let options = new RequestOptions({ headers: headers }); // Create a request option

        // ...using get request
        return this.http.get(url, options)
        // ...and calling .json() on the response to return data
        .map((res:Response) => { 
            return res.json() ;
        })
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

    //Retrieving all groups
    getGroups() : Observable<any>{

        let headers = new Headers({ 'Authorization': 'Token '+this.authService.token});
        let options = new RequestOptions({ headers: headers }); // Create a request option

        // ...using get request
        return this.http.get(this.baseUrl + `${localStorage.getItem("currentUserId")}/groups`, options)
        // ...and calling .json() on the response to return data
        .map((res:Response) => { 
            return res.json() ;
        })
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

    //Retrieving group Count
    getGroupCount(name: string) : Observable<any>{

        let headers = new Headers({ 'Authorization': 'Token '+this.authService.token});
        let options = new RequestOptions({ headers: headers }); // Create a request option

        // ...using get request
        return this.http.get(this.groupCountUrl + `?name=${name}`, options)
        // ...and calling .json() on the response to return data
        .map((res:Response) => { 
            return res.json() ;
        })
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

    // Add a new item
    addItem (body: Object, group: TodoGroup): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Token '+this.authService.token});
        let options = new RequestOptions({ headers: headers }); // Create a request option
        let item = body;
        item["owner"] = this.baseUrl + localStorage.getItem("currentUserId");
        item["group"] = group.id;

        return this.http.post(this.itemUrl, item, options) // ...using post request
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   

    // Add a new group
    addGroup (body: Object): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Token '+this.authService.token});
        let options = new RequestOptions({ headers: headers }); // Create a request option
        let item = {};
        item["owner"] = this.baseUrl + localStorage.getItem("currentUserId");
        item["name"] = body["name"];

        return this.http.post(this.groupUrl, item, options) // ...using post request
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   

    // Update an item
    updateItem (url: string, body: Object): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Token '+this.authService.token});
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.patch(url, body, options) // ...using put request
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   

    // Delete an item
    removeItem (url: string): Observable<any> {
        let headers = new Headers({ 'Authorization': 'Token '+this.authService.token});
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.delete(url,options) // ...using put request
        .map((res:Response) => true) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    } 

}

