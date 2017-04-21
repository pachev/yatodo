import { Component, OnInit , EventEmitter, Output, Input, ViewContainerRef} from '@angular/core';
import {YatodoDataService} from '../service/yatodo-data.service';
import {TodoGroup} from '../models/todo-group';
import { Overlay } from 'angular2-modal';
import { Modal, PromptPresetBuilder} from 'angular2-modal/plugins/bootstrap'

import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-todo-sidebar',
    templateUrl: './todo-sidebar.component.html',
    styleUrls: ['./todo-sidebar.component.css']
})
export class TodoSidebarComponent implements OnInit {


    @Input()
    groups: TodoGroup[];

    @Input()
    inbox: TodoGroup;

    @Output()
    swap: EventEmitter<TodoGroup> = new EventEmitter();

    @Output()
    newGroup: EventEmitter<TodoGroup> = new EventEmitter();

    public username= localStorage.getItem('currentUserName');
    public firstLetter = this.username.substring(0,1);

    constructor(public modal: Modal, overlay: Overlay, vcRef: ViewContainerRef) { 
        overlay.defaultViewContainer = vcRef;
    }

    ngOnInit() {
    }

    switchGroup(group: TodoGroup) {
        this.swap.emit(group);
    }

    addGroup() {
        this.modal.prompt()
        .size('sm')
        .body('Enter a name')
        .placeholder("Name")
        .cancelBtnClass("cancel-button")
        .keyboard(27)
        .okBtnClass("ok-button")
        .placeholder("Custom Name")
        .title('New Group')
        .open()
        .then(message => {
            return message.result;
        }).then(res =>{
            let group = new TodoGroup({name : res, count: 0});
            this.groups.push(group)
            this.newGroup.emit(group);
        })

    }

    promptDelete() {
        console.log("clicked");
    }
}
