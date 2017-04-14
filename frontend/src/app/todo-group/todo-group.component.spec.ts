import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoGroupComponent } from './todo-group.component';

describe('TodoGroupComponent', () => {
  let component: TodoGroupComponent;
  let fixture: ComponentFixture<TodoGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
