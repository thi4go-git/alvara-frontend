import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlvaraListaFilterComponent } from './alvara-lista-filter.component';

describe('AlvaraListaFilterComponent', () => {
  let component: AlvaraListaFilterComponent;
  let fixture: ComponentFixture<AlvaraListaFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlvaraListaFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlvaraListaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
