import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  public countries() {
    return this.http.get('https://countriesnow.space/api/v0.1/countries');
  }

  public weather() {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=Algeria&APPID=794ee95e63c5a32aaf88cd813fa2e425',
    );
  }
}
