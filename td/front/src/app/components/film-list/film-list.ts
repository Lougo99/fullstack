import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  AsyncPipe,
  DatePipe
} from '@angular/common';

import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

import { FilmService } from '../../services/film';
import { Film } from '../../models/film.model';

@Component({
  selector: 'app-film-list',
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './film-list.html',
  styleUrl: './film-list.css'
})
export class FilmList {
  private readonly service = inject(FilmService);

  erreur = signal<string | null>(null);

  films$ = this.service.getAll().pipe(
    catchError(() => {
      this.erreur.set(
        'Impossible de charger les films. Vérifiez que le backend est démarré.'
      );

      return of<Film[]>([]);
    })
  );

  estAncien(film: Film): boolean {
    return new Date(film.dateSortie).getFullYear() < 2000;
  }
}
