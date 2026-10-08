import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Film,
  FilmCreation
} from '../models/film.model';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private readonly http = inject(HttpClient);
  private readonly url = '/api/films';

  getAll(): Observable<Film[]> {
    return this.http.get<Film[]>(this.url);
  }

  getById(id: number): Observable<Film> {
    return this.http.get<Film>(`${this.url}/${id}`);
  }

  creer(film: FilmCreation): Observable<Film> {
    return this.http.post<Film>(this.url, film);
  }

  modifier(id: number, film: FilmCreation): Observable<Film> {
    return this.http.put<Film>(`${this.url}/${id}`, film);
  }

  supprimer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
