import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondObjectComponent } from './second-object.component';

describe('SecondObjectComponent', () => {
  let component: SecondObjectComponent;
  let fixture: ComponentFixture<SecondObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
