import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgxFixedFooterDirective } from 'ngx-fixed-footer';
import { ROUTE_DEFINITION } from './shared/constants/route-definition.constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, NgxFixedFooterDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public readonly ROUTE_DEFINITION = ROUTE_DEFINITION;
}
