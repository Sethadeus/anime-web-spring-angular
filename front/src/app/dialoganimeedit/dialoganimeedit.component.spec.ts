import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoganimeeditComponent } from './dialoganimeedit.component';

describe('DialoganimeeditComponent', () => {
  let component: DialoganimeeditComponent;
  let fixture: ComponentFixture<DialoganimeeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialoganimeeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialoganimeeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
