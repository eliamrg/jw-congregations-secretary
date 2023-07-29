import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteRegularPage } from './reporte-regular.page';

describe('ReporteRegularPage', () => {
  let component: ReporteRegularPage;
  let fixture: ComponentFixture<ReporteRegularPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReporteRegularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
