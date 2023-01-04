import { TestBed } from '@angular/core/testing';

import { SvgSymbolService } from './svg-symbol.service';

describe('SvgSymbolService', () => {
  let service: SvgSymbolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgSymbolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
