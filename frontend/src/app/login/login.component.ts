import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authService: AuthService) { }

        ngOnInit() {
            this.authService.logout();
        }

        login() {
            this.loading = true;
            this.authService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
        }

}
