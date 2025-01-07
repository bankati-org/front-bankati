import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDialogComponentComponent } from './transfer-dialog.component';

describe('TransferDialogComponentComponent', () => {
  let component: TransferDialogComponentComponent;
  let fixture: ComponentFixture<TransferDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
