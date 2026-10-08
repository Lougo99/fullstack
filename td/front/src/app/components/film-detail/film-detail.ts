import {
  Component,
  computed,
  inject,
  input,
  signal
} from '@angular/core';

import { DatePipe } from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import { Film } from '../../models/film.model';
import { FilmService } from '../../services/film';

@Component({
  selector: 'app-film-detail',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './film-detail.html',
  styleUrl: './film-detail.css'
})
export class FilmDetail {
  private readonly service = inject(FilmService);
  private readonly router = inject(Router);

  id = input.required<string>();
  filmId = computed(() => Number(this.id()));

  film = signal<Film | null>(null);
  erreur = signal<string | null>(null);

  constructor() {
    this.charger();
  }

  charger(): void {
    this.service.getById(this.filmId()).subscribe({
      next: film => {
        this.film.set(film);
        this.erreur.set(null);
      },
      error: error => {
        const detail = error.error?.detail;

        this.erreur.set(
          detail || 'Film introuvable ou serveur indisponible.'
        );
      }
    });
  }

  supprimer(): void {
    const film = this.film();

    if (!film) {
      return;
    }

    if (!window.confirm(`Supprimer « ${film.titre} » ?`)) {
      return;
    }

    this.service.supprimer(film.id).subscribe({
      next: () => {
        this.router.navigate(['/films']);
      },
      error: () => {
        this.erreur.set('La suppression a échoué.');
      }
    });
  }
}
