import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarberSchedulePage } from './barber-schedule.page';

describe('BarberSchedulePage', () => {
  let component: BarberSchedulePage;
  let fixture: ComponentFixture<BarberSchedulePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BarberSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
