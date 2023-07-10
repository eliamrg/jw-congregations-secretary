import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetaPublicadorPage } from './tarjeta-publicador.page';

describe('TarjetaPublicadorPage', () => {
  let component: TarjetaPublicadorPage;
  let fixture: ComponentFixture<TarjetaPublicadorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TarjetaPublicadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
