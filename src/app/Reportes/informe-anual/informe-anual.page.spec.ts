import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformeAnualPage } from './informe-anual.page';

describe('InformeAnualPage', () => {
  let component: InformeAnualPage;
  let fixture: ComponentFixture<InformeAnualPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InformeAnualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
