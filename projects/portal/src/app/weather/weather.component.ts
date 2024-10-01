import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { tap } from 'rxjs';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [JsonPipe, MatProgressSpinner],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent {
  private readonly api = inject(ApiService);
  public isLoading = signal(true);
  public data = toSignal(this.api.weather().pipe(tap(() => this.isLoading.set(false))));
}
