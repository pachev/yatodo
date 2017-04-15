import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthService {
    public token: string;
    public id;
 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    private baseURL = 'http://localhost:8000/api/';
 
    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.baseURL+"login", JSON.stringify({ username: username, password: password }), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                let id = response.json() && response.json().user.id;
                this.id = id;

                if (token) {
                    // set token property
                    this.token = token;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    localStorage.setItem('currentUserId', id)
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    register(user: Object) {

        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.baseURL+"register", user,  options)
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.id = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserId');
    }
}
