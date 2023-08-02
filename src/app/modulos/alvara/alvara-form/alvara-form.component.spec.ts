import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlvaraFormComponent } from './alvara-form.component';

describe('AlvaraFormComponent', () => {
  let component: AlvaraFormComponent;
  let fixture: ComponentFixture<AlvaraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlvaraFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlvaraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
