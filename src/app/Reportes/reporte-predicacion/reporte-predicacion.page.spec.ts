import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportePredicacionPage } from './reporte-predicacion.page';

describe('ReportePredicacionPage', () => {
  let component: ReportePredicacionPage;
  let fixture: ComponentFixture<ReportePredicacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReportePredicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
