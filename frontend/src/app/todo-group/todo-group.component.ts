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
    todos: Todo[]; //List of todos coming in from the home component

    @Input()
    inbox: TodoGroup; //The current inbox coming in from the home component

    @Input()
    group: TodoGroup; //The current group displayed coming in from home component

    public displayCompleted: boolean  = false;



    constructor(private dataService: YatodoDataService) { }

    //Load the llist of remote items as this component gets initated
    ngOnInit() {
        this.displayCompleted = false;
    }


    //From the todo create component, handle the add emmiter
    onAddTodo(todo) {
        this.dataService.addItem(todo, this.group)
        .subscribe( item => {
            let todo = new Todo();
            todo.id = item._links.item.href;
            todo.title = item.title;
            todo.body = item.body;
            todo.completed = item.completed;
            this.todos.push(todo);
            this.group.count +=1;

            if(this.group.name !=="Todos") //prevent updating inbox twice
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

            if(updatedTodo.completed){
                this.group.completed.push(updatedTodo);
                this.todos = this.todos
                .filter(t => t.id !== todo.id);
                this.group.count -=1;
                if(this.group.name !=="Todos") //prevent updating inbox twice
                    this.inbox.count -=1;
            }
            else{
                this.group.count +=1;
                this.todos.push(updatedTodo);
                this.group.completed = this.group.completed
                .filter(t => t.id !== todo.id);
                if(this.group.name !=="Todos") //prevent updating inbox twice
                    this.inbox.count +=1;
            }
        },
        err => {
            console.log(err);
        });



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

    onEditTodo(todo: Todo) {
        console.log("editing");
        todo.editing = true;

    }
    updateTodo(todo: Todo, newTitle: string ){
        todo.editing = false;

        if(newTitle.trim().length === 0){
            this.onRemoveTodo(todo);
            return;
        }


        let updatedTodo = new Todo();

        this.dataService.updateItem(todo.id, {
            title: newTitle.trim()
        })
        .subscribe( item => {
            updatedTodo.id = item._links.item.href;
            updatedTodo.title = item.title;
            updatedTodo.body = item.body;
            updatedTodo.completed = item.completed;

            if(updatedTodo.completed){
                let index = this.group.completed.indexOf(todo);
                this.group.completed[index] = updatedTodo;
            }else{
                let index = this.todos.indexOf(todo);
                this.todos[index] = updatedTodo;
            }
        },
        err => {
            console.log(err);
        });

    }

    cancelEditing(todo: Todo) {
        todo.editing = false;
    }

    showCompleted() {
        this.displayCompleted = !this.displayCompleted;
    }


}
