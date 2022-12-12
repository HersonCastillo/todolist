import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();
  });

  it('should renders correctly', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
