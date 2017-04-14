import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSidebarComponent } from './todo-sidebar.component';

describe('TodoSidebarComponent', () => {
  let component: TodoSidebarComponent;
  let fixture: ComponentFixture<TodoSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
