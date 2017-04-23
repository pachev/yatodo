import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Modal imports
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

//Components
import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoGroupComponent } from './todo-group/todo-group.component';
import { TodoItemCreateComponent } from './todo-item-create/todo-item-create.component';
import { TodoSidebarComponent } from './todo-sidebar/todo-sidebar.component';
import { LoginComponent } from './login/login.component';

import {Settings} from './settings'

//Services
import {AuthService} from './service/auth.service';
import {YatodoDataService} from './service/yatodo-data.service';


import { AuthGuard } from './splash/auth.guard';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoGroupComponent,
    TodoItemCreateComponent,
    TodoSidebarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [
      AuthService,
      YatodoDataService,
      AuthGuard,
      Settings
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
