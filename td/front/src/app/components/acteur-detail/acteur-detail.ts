import {
  Component,
  computed,
  inject,
  input,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { Acteur } from '../../models/acteur.model';
import { Film } from '../../models/film.model';
import { ActeurService } from '../../services/acteur';

@Component({
  selector: 'app-acteur-detail',
  imports: [
    RouterLink
  ],
  templateUrl: './acteur-detail.html',
  styleUrl: './acteur-detail.css'
})
export class ActeurDetail {
  private readonly service = inject(ActeurService);

  id = input.required<string>();
  acteurId = computed(() => Number(this.id()));

  acteur = signal<Acteur | null>(null);
  films = signal<Film[]>([]);
  erreur = signal<string | null>(null);

  constructor() {
    this.charger();
  }

  charger(): void {
    const id = this.acteurId();

    this.service.getById(id).subscribe({
      next: acteur => {
        this.acteur.set(acteur);
      },
      error: () => {
        this.erreur.set('Acteur introuvable.');
      }
    });

    this.service.getFilms(id).subscribe({
      next: films => {
        this.films.set(films);
      },
      error: () => {
        this.erreur.set(
          'Impossible de charger les films de cet acteur.'
        );
      }
    });
  }
}
