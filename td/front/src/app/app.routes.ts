import { Routes } from '@angular/router';

import { FilmList } from './components/film-list/film-list';
import { FilmDetail } from './components/film-detail/film-detail';
import { FilmForm } from './components/film-form/film-form';

import { ActeurList } from './components/acteur-list/acteur-list';
import { ActeurDetail } from './components/acteur-detail/acteur-detail';

import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  {
    path: 'films',
    component: FilmList
  },
  {
    path: 'films/nouveau',
    component: FilmForm
  },
  {
    path: 'films/:id/modifier',
    component: FilmForm
  },
  {
    path: 'films/:id',
    component: FilmDetail
  },
  {
    path: 'acteurs',
    component: ActeurList
  },
  {
    path: 'acteurs/:id',
    component: ActeurDetail
  },
  {
    path: '',
    redirectTo: 'films',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFound
  }
];
