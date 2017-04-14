import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {Todo} from '../models/todo';
import {YatodoDataService} from '../service/yatodo-data.service';

@Component({
  selector: 'app-todo-group',
  templateUrl: './todo-group.component.html',
  styleUrls: ['./todo-group.component.css']
})
export class TodoGroupComponent implements OnInit {

    @Input()
    todos;

    @Output()
    remove: EventEmitter<Todo> = new EventEmitter();

    @Output()
    toggleComplete: EventEmitter<Todo> = new EventEmitter();


    constructor(private dataService: YatodoDataService) { }

    ngOnInit() {
        this.loadTodos();
    }

    loadTodos(){
        let todos = [];
        todos.push(new Todo({title: "you sucke"}));
        todos.push(new Todo({title: "You suck"}));

        this.dataService.getItems()
        .subscribe( emb =>{
            console.log(emb);
        },
        err => {
            console.log(err);
        });
        this.todos = todos;

    }

    onToggleTodoComplete(todo: Todo) {
        this.toggleComplete.emit(todo);
    }

    onRemoveTodo(todo: Todo) {
        this.remove.emit(todo);
    }

}
