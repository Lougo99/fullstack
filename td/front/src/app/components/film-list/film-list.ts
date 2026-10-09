import {
  Component,
  inject, OnInit,
  signal
} from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  catchError,
  of
} from 'rxjs';

import { Film } from '../../models/film.model';
import { FilmService } from '../../services/film';
import { FilmCard } from '../film-card/film-card';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-film-list',
  imports: [
    RouterLink,
    FilmCard
  ],
  templateUrl: './film-list.html',
  styleUrl: './film-list.css'
})
export class FilmList implements OnInit{
  private readonly service = inject(FilmService);

  erreur = signal<string | null>(null);
  films$ = signal<Film[]>([]);

  ngOnInit() {
    this.chargerFilms();
  }

  chargerFilms() {
    this.service.getAll().pipe(
      catchError(() => {
        this.erreur.set(
          'Impossible de charger les films. Vérifiez que le backend est démarré.'
        );

        return of<Film[]>([]);
      })
    ).subscribe(this.films$.set);
  }

  onSupprimer(film: Film): void {
    const confirmation = window.confirm(
      `Supprimer le film « ${film.titre} » ?`
    );

    if (!confirmation) {
      return;
    }

    this.service.supprimer(film.id).subscribe({
      next: () => {
          this.erreur.set(null);
          this.chargerFilms();
      },
      error: () => {
        this.erreur.set(
          `Impossible de supprimer « ${film.titre} ».`
        );
      }
    });
  }
}
