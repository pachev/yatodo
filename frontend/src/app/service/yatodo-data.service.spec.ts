import { TestBed, inject } from '@angular/core/testing';

import { YatodoDataService } from './yatodo-data.service';

describe('YatodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YatodoDataService]
    });
  });

  it('should ...', inject([YatodoDataService], (service: YatodoDataService) => {
    expect(service).toBeTruthy();
  }));
});
