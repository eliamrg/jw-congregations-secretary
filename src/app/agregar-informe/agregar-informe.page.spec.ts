import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarInformePage } from './agregar-informe.page';

describe('AgregarInformePage', () => {
  let component: AgregarInformePage;
  let fixture: ComponentFixture<AgregarInformePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarInformePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
