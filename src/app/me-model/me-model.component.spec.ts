import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeModelComponent } from './me-model.component';

describe('MeModelComponent', () => {
  let component: MeModelComponent;
  let fixture: ComponentFixture<MeModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
