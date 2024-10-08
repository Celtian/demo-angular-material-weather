import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { MapComponent } from '../shared/components/map/map.component';
import { WeatherIconComponent, WeatherState } from '../shared/components/weather-icon/weather-icon.component';
import { WeatherData } from '../shared/dto/weather.dto';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [MatProgressSpinner, MapComponent, WeatherIconComponent, RouterLink, MatButtonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly api = inject(ApiService);
  public readonly isLoading = signal(true);
  public readonly data = signal<WeatherData | undefined>(undefined);
  public readonly country = input<string>();
  public readonly units = input<'metric' | 'imperial'>('metric');

  public readonly state = computed<WeatherState>(() => {
    const d = this.data();
    if (d?.rain?.['1h'] && d?.rain['1h'] > 0) {
      return 'RAINY';
    } else if (d?.clouds.all && d.clouds.all > 0) {
      return 'CLOUDY';
    } else {
      return 'SUNNY';
    }
  });

  constructor() {
    effect(() => {
      this.api
        .weather(this.units() || 'imperial', this.country())
        .pipe(
          tap(() => this.isLoading.set(false)),
          finalize(() => this.isLoading.set(false)),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe({
          next: (data) => this.data.set(data),
        });
    });
  }
}
