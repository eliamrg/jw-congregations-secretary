import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcomodadoresPage } from './acomodadores.page';

describe('AcomodadoresPage', () => {
  let component: AcomodadoresPage;
  let fixture: ComponentFixture<AcomodadoresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AcomodadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
