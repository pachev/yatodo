import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemCreateComponent } from './todo-item-create.component';

describe('TodoItemCreateComponent', () => {
  let component: TodoItemCreateComponent;
  let fixture: ComponentFixture<TodoItemCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoItemCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
