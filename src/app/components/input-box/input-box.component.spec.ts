import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { InputBoxComponent } from './input-box.component';

describe('InputBoxComponent', () => {
  let component: InputBoxComponent;
  let fixture: ComponentFixture<InputBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputBoxComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
