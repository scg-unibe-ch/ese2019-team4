import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {DatabaseService} from '../../database/database.service';
import {HttpClientModule} from '@angular/common/http';

/**
 * A mock class to test LoginService independent from DatabaseService
 */
class MockDatabaseService extends DatabaseService {
  add() {}
  post() {}
}

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      {provide: DatabaseService,
      useClass: MockDatabaseService},
      {provide: String, useValue: 'abc'}
    ]
  }));

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
