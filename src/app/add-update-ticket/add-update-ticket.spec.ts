import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTicket } from './add-update-ticket';

describe('AddUpdateTicket', () => {
  let component: AddUpdateTicket;
  let fixture: ComponentFixture<AddUpdateTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
