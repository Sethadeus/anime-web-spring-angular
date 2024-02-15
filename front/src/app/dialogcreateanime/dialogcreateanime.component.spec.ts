import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcreateanimeComponent } from './dialogcreateanime.component';

describe('DialogcreateanimeComponent', () => {
  let component: DialogcreateanimeComponent;
  let fixture: ComponentFixture<DialogcreateanimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogcreateanimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogcreateanimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
