import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarEditarPublicadorComponent } from './agregar-editar-publicador.component';

describe('AgregarEditarPublicadorComponent', () => {
  let component: AgregarEditarPublicadorComponent;
  let fixture: ComponentFixture<AgregarEditarPublicadorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEditarPublicadorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarEditarPublicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
