import { Routes } from '@angular/router';
import { ROUTE_DEFINITION } from './shared/constants/route-definition.constant';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTE_DEFINITION.APP.COUNTRIES,
  },
  {
    path: ROUTE_DEFINITION.APP.COUNTRIES,
    title: ROUTE_DEFINITION.APP.COUNTRIES,
    loadComponent: () => import('./countries/countries.component').then((m) => m.CountriesComponent),
  },
  {
    path: ROUTE_DEFINITION.APP.WEATHER,
    title: ROUTE_DEFINITION.APP.WEATHER,
    loadComponent: () => import('./weather/weather.component').then((m) => m.WeatherComponent),
  },
  {
    path: '**',
    title: ROUTE_DEFINITION.APP.NOT_FOUND,
    loadComponent: () => import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
