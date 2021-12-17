import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdOneComponent } from './third-one.component';

describe('ThirdOneComponent', () => {
  let component: ThirdOneComponent;
  let fixture: ComponentFixture<ThirdOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
