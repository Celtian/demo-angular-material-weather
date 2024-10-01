import { LowerCasePipe, NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { ROUTE_DEFINITION } from '../shared/constants/route-definition.constant';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [
    MatProgressSpinner,
    LowerCasePipe,
    NgOptimizedImage,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    RouterLink,
    NgClass,
  ],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent {
  public readonly ROUTE_DEFINITION = ROUTE_DEFINITION;
  private readonly api = inject(ApiService);
  public readonly isLoading = signal(true);
  public readonly data = toSignal(this.api.countries().pipe(tap(() => this.isLoading.set(false))));
  public readonly countries = computed(() => this.data()?.data || []);
  public readonly view = input<'list' | 'grid'>('list');
}
