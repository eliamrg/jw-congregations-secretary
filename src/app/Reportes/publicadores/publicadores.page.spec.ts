import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicadoresPage } from './publicadores.page';

describe('PublicadoresPage', () => {
  let component: PublicadoresPage;
  let fixture: ComponentFixture<PublicadoresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PublicadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
