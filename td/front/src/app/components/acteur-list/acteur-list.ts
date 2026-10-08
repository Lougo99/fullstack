import {
  Component,
  inject,
  signal
} from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  catchError,
  of
} from 'rxjs';

import { Acteur } from '../../models/acteur.model';
import { ActeurService } from '../../services/acteur';

@Component({
  selector: 'app-acteur-list',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './acteur-list.html',
  styleUrl: './acteur-list.css'
})
export class ActeurList {
  private readonly service = inject(ActeurService);

  erreur = signal<string | null>(null);

  acteurs$ = this.service.getAll().pipe(
    catchError(() => {
      this.erreur.set(
        'Impossible de charger les acteurs.'
      );

      return of<Acteur[]>([]);
    })
  );
}
