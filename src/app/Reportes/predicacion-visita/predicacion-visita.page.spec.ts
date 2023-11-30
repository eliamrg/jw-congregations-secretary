import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PredicacionVisitaPage } from './predicacion-visita.page';

describe('PredicacionVisitaPage', () => {
  let component: PredicacionVisitaPage;
  let fixture: ComponentFixture<PredicacionVisitaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PredicacionVisitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
