import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-todo-sidebar',
    templateUrl: './todo-sidebar.component.html',
    styleUrls: ['./todo-sidebar.component.css']
})
export class TodoSidebarComponent implements OnInit {

    public username= localStorage.getItem('currentUserName');
    public firstLetter = this.username.substring(0,1);
    constructor() { }

    ngOnInit() {
    }

}
