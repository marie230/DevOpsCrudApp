import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';

describe('DataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });
});
