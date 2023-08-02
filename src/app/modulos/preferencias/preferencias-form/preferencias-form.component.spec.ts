import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciasFormComponent } from './preferencias-form.component';

describe('PreferenciasFormComponent', () => {
  let component: PreferenciasFormComponent;
  let fixture: ComponentFixture<PreferenciasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenciasFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferenciasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
