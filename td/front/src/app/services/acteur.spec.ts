import { TestBed } from '@angular/core/testing';
import { Acteur } from './acteur';

describe('Acteur', () => {
  let service: Acteur;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Acteur);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
