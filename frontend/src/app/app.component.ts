import { Component } from '@angular/core';
import {YatodoDataService} from './service/yatodo-data.service';
import {Todo} from './models/todo';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor() {
    }

}
