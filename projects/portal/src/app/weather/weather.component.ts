import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { finalize, tap } from 'rxjs';
import { MapComponent } from '../shared/components/map/map.component';
import { WeatherData } from '../shared/dto/weather.dto';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [MatProgressSpinner, MapComponent],
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

  constructor() {
    effect(() => {
      this.api
        .weather(this.country())
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
