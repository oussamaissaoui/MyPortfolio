import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnHovComponent } from './on-hov.component';

describe('OnHovComponent', () => {
  let component: OnHovComponent;
  let fixture: ComponentFixture<OnHovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnHovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnHovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
