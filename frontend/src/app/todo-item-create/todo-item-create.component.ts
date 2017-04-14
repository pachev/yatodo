import {Component, Output, EventEmitter} from '@angular/core';
import {Todo} from '../models/todo'

@Component({
  selector: 'app-todo-item-create',
  templateUrl: './todo-item-create.component.html',
  styleUrls: ['./todo-item-create.component.css']
})
export class TodoItemCreateComponent {

    newTodo: Todo = new Todo();

    @Output()
    add: EventEmitter<Todo> = new EventEmitter();

    constructor() { }

    addTodo() {
        this.add.emit(this.newTodo);
        this.newTodo = new Todo();
    }


}
