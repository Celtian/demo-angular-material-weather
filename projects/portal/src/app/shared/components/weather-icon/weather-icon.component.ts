import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type WeatherState = 'SUNNY' | 'CLOUDY' | 'RAINY';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './weather-icon.component.html',
  styleUrl: './weather-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherIconComponent {
  public readonly state = input.required<WeatherState>();
  public readonly imgPath = computed(() => {
    switch (this.state()) {
      case 'SUNNY':
        return 'weather/sunny.png';
      case 'CLOUDY':
        return 'weather/cloudy.png';
      case 'RAINY':
        return 'weather/rainy.png';
    }
  });
}
