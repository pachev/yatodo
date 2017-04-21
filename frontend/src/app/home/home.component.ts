import { Component, OnInit } from '@angular/core';
import {Todo} from '../models/todo';
import {TodoGroup} from '../models/todo-group';
import {YatodoDataService} from '../service/yatodo-data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public todos: Todo[];
    public groups: TodoGroup[];
    public currentGroup: TodoGroup; 
    public inbox: TodoGroup = new TodoGroup();

    public initialAnimation = true;

    constructor(private dataService: YatodoDataService) { }

    ngOnInit() {
        this.loadAllTodos();
        this.loadGroups();
        
    }

    //Initally display all of the todos
    loadAllTodos(){
        let todos = [];
        this.inbox.name = 'Todos'
        let count = 0;
        //This should come from a settings file;
        this.inbox.items = 'http://localhost:8000/api/users/'+ `${localStorage.getItem("currentUserId")}/items`

        this.dataService.getItems()
        .subscribe( emb =>{
            if(emb){
                let items = emb._embedded.items;
                items.forEach((item)=> {
                    let todo = new Todo();
                    todo.id = item._links.item.href;
                    todo.title = item.title;
                    todo.body = item.body;
                    todo.completed = item.completed;
                    todos.push(todo);
                });

            this.inbox.count = emb._embedded.items.length;
            this.inbox.selected = true;
            this.currentGroup = this.inbox;
            

            }
            
        },
        err => {
            console.log(err);
            //TODO: add better error handling
        });

        this.todos = todos;
    }

    loadGroupTodo(group: TodoGroup) {
        let todos = [];
        this.currentGroup.selected = false;
        this.dataService.getGroupItems(group.items)
        .subscribe(emb => {
            if(emb){
                let items = emb._embedded.items;
                items.forEach((item)=> {
                    let todo = new Todo();
                    todo.id = item._links.item.href;
                    todo.title = item.title;
                    todo.body = item.body;
                    todo.completed = item.completed;
                    todos.push(todo);
                });

            }
            group.selected = true;
            this.currentGroup = group;
        },
        err =>{
            console.log(err);
        });
        this.todos = todos;
    }

    //For Sidebar Groups
    loadGroups(){
        let groups = [];

        this.dataService.getGroups()
        .subscribe( emb =>{

            if(emb){
                let items = emb._embedded.groups;
                items.forEach((item)=> {
                    let group = new TodoGroup();
                    group.id = item._links.self.href;
                    group.name = item.name;
                    group.items = item._links.items.href;
                    group.selected = false;
                    groups.push(group);
                });
            }
            this.groups = groups;
            this.loadCounts();
        },
        err => {
            console.log(err);
            //TODO: add better error handling
        });
    }

    //TODO: Refractor to remove multiple requests
    loadCounts(){
        this.groups.forEach((group) =>{
            this.dataService.getGroupCount(group.name)
            .subscribe( num => {
                group.count = num;
            },
            err=>{
                console.log(err);
            });
        });
    }

    onSwitchGroup(group: TodoGroup){
        this.loadGroupTodo(group);
    }

    onAddGroup(group: TodoGroup){
        this.dataService.addGroup(group)
        .subscribe( emb => {
            group.id = emb._links.self.href;
            group.items = emb._links.items.href;
            group.selected = false;
        },
        err=>{
            console.log(err);
        });
    }



}
