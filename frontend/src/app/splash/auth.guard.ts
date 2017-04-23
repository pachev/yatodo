import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
/*
 * This acts as a guard for whether the user needs to login or not
 * If the user is already logged in, then continue
 * else redirect them to the login screen
 */

@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            console.log("user is logged in");
            return true;
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
