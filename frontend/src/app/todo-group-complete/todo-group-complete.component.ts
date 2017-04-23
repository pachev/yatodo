import { Component, OnInit, Input } from '@angular/core';
import {Todo} from '../models/todo';
import {TodoGroup} from '../models/todo-group';
import {YatodoDataService} from '../service/yatodo-data.service';

@Component({
    selector: 'app-todo-group-complete',
    templateUrl: './todo-group-complete.component.html',
    styleUrls: ['./todo-group-complete.component.css']
})
export class TodoGroupCompleteComponent implements OnInit {


    @Input()
    completedItems: Todo[];


    @Input()
    currentGroup: Todo[];



    constructor(private dataService: YatodoDataService) { }

    ngOnInit() {
    }

    
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

        this.currentGroup.push(updatedTodo);
        this.completedItems = this.completedItems
        .filter(t => t.id !== todo.id);

    }

    //Handles deletion from single item emmiter
    onRemoveTodo(todo: Todo) {

        this.dataService.removeItem(todo.id)
        .subscribe(item => {
            if(item){
                this.completedItems = this.completedItems
                .filter(t => t.id !== todo.id);
            }
        }, 
        err =>{
            console.log(err);
        });
        
    }

    onClearAll() {

    }

}
