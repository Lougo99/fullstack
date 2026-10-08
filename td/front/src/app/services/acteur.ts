import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Acteur } from '../models/acteur.model';
import { Film } from '../models/film.model';

@Injectable({
  providedIn: 'root'
})
export class ActeurService {
  private readonly http = inject(HttpClient);
  private readonly url = '/api/acteurs';

  getAll(): Observable<Acteur[]> {
    return this.http.get<Acteur[]>(this.url);
  }

  getById(id: number): Observable<Acteur> {
    return this.http.get<Acteur>(`${this.url}/${id}`);
  }

  getFilms(id: number): Observable<Film[]> {
    return this.http.get<Film[]>(
      `${this.url}/${id}/films`
    );
  }
}
