import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSignUpComponent } from './dialogsignup.component';

describe('DialogsignupComponent', () => {
  let component: DialogSignUpComponent;
  let fixture: ComponentFixture<DialogSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSignUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
