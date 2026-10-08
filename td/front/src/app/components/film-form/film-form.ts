import {
  Component,
  computed,
  inject,
  input,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  Film,
  FilmCreation
} from '../../models/film.model';

import { FilmService } from '../../services/film';

@Component({
  selector: 'app-film-form',
  imports: [
    FormsModule
  ],
  templateUrl: './film-form.html',
  styleUrl: './film-form.css'
})
export class FilmForm {
  private readonly service = inject(FilmService);
  private readonly router = inject(Router);

  id = input<string>();
  filmId = computed(() => this.id() ? Number(this.id()) : null);

  film: FilmCreation = {
    titre: '',
    realisateur: '',
    dateSortie: '',
    genre: 'ACTION'
  };

  erreur = signal<string | null>(null);
  edition = computed(() => this.filmId() !== null);

  constructor() {
    const id = this.filmId();

    if (id !== null) {
      this.chargerFilm(id);
    }
  }

  chargerFilm(id: number): void {
    this.service.getById(id).subscribe({
      next: film => {
        this.film = {
          titre: film.titre,
          realisateur: film.realisateur,
          dateSortie: film.dateSortie,
          genre: film.genre,
          acteursIds: film.acteursIds
        };
      },
      error: () => {
        this.erreur.set('Impossible de charger le film à modifier.');
      }
    });
  }

  enregistrer(): void {
    const id = this.filmId();

    if (id === null) {
      this.creer();
      return;
    }

    this.modifier(id);
  }

  creer(): void {
    this.service.creer(this.film).subscribe({
      next: film => {
        this.router.navigate(['/films', film.id]);
      },
      error: error => {
        this.erreur.set(
          error.error?.detail || 'Création impossible.'
        );
      }
    });
  }

  modifier(id: number): void {
    this.service.modifier(id, this.film).subscribe({
      next: film => {
        this.router.navigate(['/films', film.id]);
      },
      error: error => {
        this.erreur.set(
          error.error?.detail || 'Modification impossible.'
        );
      }
    });
  }
}
