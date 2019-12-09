import {TestBed} from '@angular/core/testing';

import {DatabaseService} from './database.service';
import {HttpClientModule} from '@angular/common/http';

describe('DatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      {provide: String, useValue: 'Url'}
    ]
  }));

  it('should be created', () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    expect(service).toBeTruthy();
  });
});
