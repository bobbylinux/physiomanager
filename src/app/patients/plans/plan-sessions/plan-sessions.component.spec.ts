import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSessionsComponent } from './plan-sessions.component';

describe('PlanSessionsComponent', () => {
  let component: PlanSessionsComponent;
  let fixture: ComponentFixture<PlanSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
