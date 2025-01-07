import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientByAdminComponent } from './add-client-by-admin.component';

describe('AddClientByAdminComponent', () => {
  let component: AddClientByAdminComponent;
  let fixture: ComponentFixture<AddClientByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClientByAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClientByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
