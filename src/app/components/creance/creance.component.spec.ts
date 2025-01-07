import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreanceComponent } from './creance.component';

describe('CreanceComponent', () => {
  let component: CreanceComponent;
  let fixture: ComponentFixture<CreanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
