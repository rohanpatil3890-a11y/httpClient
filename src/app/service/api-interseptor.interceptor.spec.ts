import { TestBed } from '@angular/core/testing';

import { ApiInterseptorInterceptor } from './api-interseptor.interceptor';

describe('ApiInterseptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiInterseptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiInterseptorInterceptor = TestBed.inject(ApiInterseptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
