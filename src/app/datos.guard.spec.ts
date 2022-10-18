import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { DatosGuard } from './datos.guard';

describe('DatosGuard', () => {
  let guard: DatosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
    });
    
    guard = TestBed.inject(DatosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
