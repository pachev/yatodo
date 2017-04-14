import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoGroupCompleteComponent } from './todo-group-complete.component';

describe('TodoGroupCompleteComponent', () => {
  let component: TodoGroupCompleteComponent;
  let fixture: ComponentFixture<TodoGroupCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoGroupCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoGroupCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
