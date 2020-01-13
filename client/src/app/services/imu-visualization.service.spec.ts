import { TestBed } from '@angular/core/testing';

import { ImuVisualizationService } from './imu-visualization.service';

describe('ImuVisualizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImuVisualizationService = TestBed.get(ImuVisualizationService);
    expect(service).toBeTruthy();
  });
});
