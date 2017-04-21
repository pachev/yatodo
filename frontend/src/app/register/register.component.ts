import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import  {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

constructor(
        private router: Router,
        private authService: AuthService) { }
 
    register() {
        console.log("being called");
        this.loading = true;
        this.authService.register(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.router.navigate(['/login']);
                },
                error => {
                    this.error = 'Fialed To Register';
                    this.loading = false;
                });
    }

    ngOnInit() {
    }

}
