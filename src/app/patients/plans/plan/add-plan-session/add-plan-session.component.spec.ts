import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanSessionComponent } from './add-plan-session.component';

describe('AddPlanSessionComponent', () => {
  let component: AddPlanSessionComponent;
  let fixture: ComponentFixture<AddPlanSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlanSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
