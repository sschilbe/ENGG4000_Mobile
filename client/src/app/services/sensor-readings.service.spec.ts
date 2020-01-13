import { TestBed } from '@angular/core/testing';

import { SensorReadingsService } from './sensor-readings.service';

describe('SensorReadingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorReadingsService = TestBed.get(SensorReadingsService);
    expect(service).toBeTruthy();
  });
});
