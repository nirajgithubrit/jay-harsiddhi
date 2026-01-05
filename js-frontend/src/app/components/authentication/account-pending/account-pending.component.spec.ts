import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPendingComponent } from './account-pending.component';

describe('AccountPendingComponent', () => {
  let component: AccountPendingComponent;
  let fixture: ComponentFixture<AccountPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
