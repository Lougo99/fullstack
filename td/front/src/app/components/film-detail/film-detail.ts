import {
  Component,
  computed,
  inject,
  input,
  signal
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { Acteur } from '../../models/acteur.model';
import { Film } from '../../models/film.model';

import { ActeurService } from '../../services/acteur';
import { FilmService } from '../../services/film';

@Component({
  selector: 'app-film-detail',
  imports: [
    DatePipe,
    FormsModule,
    RouterLink
  ],
  templateUrl: './film-detail.html',
  styleUrl: './film-detail.css'
})
export class FilmDetail {
  private readonly filmService = inject(FilmService);
  private readonly acteurService = inject(ActeurService);
  private readonly router = inject(Router);

  id = input.required<string>();
  filmId = computed(() => Number(this.id()));

  film = signal<Film | null>(null);
  acteursAssocies = signal<Acteur[]>([]);
  tousLesActeurs = signal<Acteur[]>([]);

  acteurSelectionne = signal<number | null>(null);
  erreur = signal<string | null>(null);

  acteursDisponibles = computed(() => {
    const idsAssocies = new Set(
      this.acteursAssocies().map(acteur => acteur.id)
    );

    return this.tousLesActeurs().filter(
      acteur => !idsAssocies.has(acteur.id)
    );
  });

  constructor() {
    this.recharger();
  }

  recharger(): void {
    const id = this.filmId();

    this.filmService.getById(id).subscribe({
      next: film => {
        this.film.set(film);
        this.erreur.set(null);
      },
      error: error => {
        this.erreur.set(
          error.error?.detail || 'Film introuvable.'
        );
      }
    });

    this.filmService.getActeurs(id).subscribe({
      next: acteurs => {
        this.acteursAssocies.set(acteurs);
      },
      error: () => {
        this.erreur.set(
          'Impossible de charger les acteurs du film.'
        );
      }
    });

    this.acteurService.getAll().subscribe({
      next: acteurs => {
        this.tousLesActeurs.set(acteurs);
      },
      error: () => {
        this.erreur.set(
          'Impossible de charger la liste des acteurs.'
        );
      }
    });
  }

  associer(): void {
    const acteurId = this.acteurSelectionne();

    if (acteurId === null) {
      return;
    }

    this.filmService
      .associerActeur(this.filmId(), acteurId)
      .subscribe({
        next: () => {
          this.acteurSelectionne.set(null);
          this.recharger();
        },
        error: () => {
          this.erreur.set('Association impossible.');
        }
      });
  }

  dissocier(acteur: Acteur): void {
    this.filmService
      .dissocierActeur(this.filmId(), acteur.id)
      .subscribe({
        next: () => this.recharger(),
        error: () => {
          this.erreur.set(
            `Dissociation de ${acteur.nom} impossible.`
          );
        }
      });
  }

  supprimer(): void {
    const film = this.film();

    if (!film || !window.confirm(`Supprimer « ${film.titre} » ?`)) {
      return;
    }

    this.filmService.supprimer(film.id).subscribe({
      next: () => this.router.navigate(['/films']),
      error: () => {
        this.erreur.set('La suppression a échoué.');
      }
    });
  }
}
