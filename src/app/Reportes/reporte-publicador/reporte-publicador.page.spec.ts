import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportePublicadorPage } from './reporte-publicador.page';

describe('ReportePublicadorPage', () => {
  let component: ReportePublicadorPage;
  let fixture: ComponentFixture<ReportePublicadorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReportePublicadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
