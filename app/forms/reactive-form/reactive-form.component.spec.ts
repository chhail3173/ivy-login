import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormComponent } from './reactive-form.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('ReactiveFormComponent', () => {
  let component: ReactiveFormComponent;
  let fixture: ComponentFixture<ReactiveFormComponent>;

  beforeEach(async () => {
  
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      declarations: [ ReactiveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('email ', () => {
    const form = component.myForm;
    form.controls.email.setValue('chhail.bihari@walkingtree.tech')
    expect(component.valEmail(form.controls.email)).toBe(null);
  });
});
