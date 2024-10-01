import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CountriesResponseDto } from '../dto/countires.dto';
import { WeatherData } from '../dto/weather.dto';

const APP_ID = '794ee95e63c5a32aaf88cd813fa2e425';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  public countries() {
    return this.http.get<CountriesResponseDto>('https://countriesnow.space/api/v0.1/countries');
  }

  public weather(units: 'metric' | 'imperial', country = '') {
    return this.http.get<WeatherData>(
      `https://api.openweathermap.org/data/2.5/weather?APPID=${APP_ID}&q=${country}&units=${units}`,
    );
  }
}
