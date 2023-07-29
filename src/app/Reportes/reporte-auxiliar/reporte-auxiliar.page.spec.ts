import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteAuxiliarPage } from './reporte-auxiliar.page';

describe('ReporteAuxiliarPage', () => {
  let component: ReporteAuxiliarPage;
  let fixture: ComponentFixture<ReporteAuxiliarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReporteAuxiliarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
