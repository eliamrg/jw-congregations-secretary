import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarAsistenciaPage } from './agregar-asistencia.page';

describe('AgregarAsistenciaPage', () => {
  let component: AgregarAsistenciaPage;
  let fixture: ComponentFixture<AgregarAsistenciaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
