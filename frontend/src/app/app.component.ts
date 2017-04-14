import { Component } from '@angular/core';
import {YatodoDataService} from './service/yatodo-data.service';
import {Todo} from './models/todo';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private dataService: YatodoDataService ) {

    }
    onAddTodo(todo) {
        this.dataService.addItem(todo);
    }

    onToggleTodoComplete(todo) {
        this.dataService.updateItem(todo);
    }

    onRemoveTodo(todo) {
        this.dataService.removeItem(todo.id);
    }


}
