import { Component, OnInit } from '@angular/core';
import {Todo} from '../models/todo';
import {TodoGroup} from '../models/todo-group';
import {YatodoDataService} from '../service/yatodo-data.service';
import {Settings} from '../settings';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // List of two way bindngs to be distributed to child components
    public todos: Todo[];
    public groups: TodoGroup[];
    public currentGroup: TodoGroup = new TodoGroup(); 
    public completedItems = []; 
    public inbox: TodoGroup = new TodoGroup();

    constructor(private dataService: YatodoDataService, private settings: Settings) { }

    ngOnInit() {
        this.loadAllTodos();
        this.loadGroups();
        
    }

    //Initally display all of the todos
    loadAllTodos(){
        let todos = [];
        this.inbox.name = 'Todos';
        this.inbox.items = this.settings.baseUserUrl+ `${localStorage.getItem("currentUserId")}/items`;

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
                    if(todo.completed)
                        this.completedItems.push(todo);

                    todos.push(todo);
                });

            this.inbox.count = emb._embedded.items.length;
            this.inbox.selected = true;
            this.currentGroup = this.inbox;
            }
            this.todos = todos;
            
        },
        err => {
            console.log(err);
        });

    }

    //This is called when groups are changed
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

    //Loads the groups that are displayed on the sidebar
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

    //Initally load the count of each group for display when the app starts
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



    //Handling of switch event from todo-sidebar component
    onSwitchGroup(group: TodoGroup){
        this.loadGroupTodo(group);
    }

    //Handling of add event from todo-sidebar component
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
