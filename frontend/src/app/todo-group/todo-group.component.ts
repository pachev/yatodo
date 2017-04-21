//TODO: update todo model to look exaclty like te api version with links
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {Todo} from '../models/todo';
import {TodoGroup} from '../models/todo-group';
import {YatodoDataService} from '../service/yatodo-data.service';

@Component({
  selector: 'app-todo-group',
  templateUrl: './todo-group.component.html',
  styleUrls: ['./todo-group.component.css']
})
export class TodoGroupComponent implements OnInit {


    @Input()
    todos: Todo[];

    @Input()
    inbox: TodoGroup;

    @Input()
    group: TodoGroup;


    constructor(private dataService: YatodoDataService) { }

    //Load the llist of remote items as this component gets initated
    ngOnInit() {
    }


    //From the todo create component, handle the add emmiter
    onAddTodo(todo) {
        console.log(this.group);
        this.dataService.addItem(todo, this.group)
        .subscribe( item => {
            let todo = new Todo();
            todo.id = item._links.item.href;
            todo.title = item.title;
            todo.body = item.body;
            todo.completed = item.completed;
            this.todos.push(todo);
            this.group.count +=1;
            if(this.group.name !=="Todos")
                this.inbox.count +=1;
        },
        err => {
            console.log(err);
        });
    
    }

    //From the todo create component, handle the toggle emmiter
    onToggleTodoComplete(todo) {
        let updatedTodo = new Todo();
        
        this.dataService.updateItem(todo.id, {
            completed: !todo.completed
        })
        .subscribe( item => {
            updatedTodo.id = item._links.item.href;
            updatedTodo.title = item.title;
            updatedTodo.body = item.body;
            updatedTodo.completed = item.completed;
        },
        err => {
            console.log(err);
        });
        let index = this.todos.indexOf(todo);
        this.todos[index] = updatedTodo;

        return updatedTodo;
    }

    //Handles deletion from single item emmiter
    onRemoveTodo(todo: Todo) {

        this.dataService.removeItem(todo.id.toString())
        .subscribe(item => {
            if(item){
                this.todos = this.todos
                .filter(t => t.id !== todo.id);
                this.group.count -=1;
            }
        }, 
        err =>{
            console.log(err);
        });
        
    }

}
