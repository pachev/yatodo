import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Components
import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoGroupComponent } from './todo-group/todo-group.component';
import { TodoItemCreateComponent } from './todo-item-create/todo-item-create.component';
import { TodoGroupCompleteComponent } from './todo-group-complete/todo-group-complete.component';
import { TodoSidebarComponent } from './todo-sidebar/todo-sidebar.component';

//Services
import {AuthService} from './service/auth.service';
import {YatodoDataService} from './service/yatodo-data.service';



@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoGroupComponent,
    TodoItemCreateComponent,
    TodoGroupCompleteComponent,
    TodoSidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
      AuthService,
      YatodoDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
