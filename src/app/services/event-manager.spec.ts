import { TestBed } from '@angular/core/testing';
import { EventManager } from './event-manager';

describe('EventManager', () => {
  let service: EventManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
