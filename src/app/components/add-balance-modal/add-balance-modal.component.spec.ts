import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBalanceModalComponent } from './add-balance-modal.component';

describe('AddBalanceModalComponent', () => {
  let component: AddBalanceModalComponent;
  let fixture: ComponentFixture<AddBalanceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBalanceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBalanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
