import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChildrenOutletContexts, RouterModule, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { fadeInOut, SLIDE_IN_ANIMATION } from "./constants/animation.constants";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    SidebarComponent,
  ],
  animations: [
    SLIDE_IN_ANIMATION
  ],
  providers: [

  ]
})
export class AppComponent {
  title = 'v14-here';
  isExpanded = true;
  constructor(private readonly contexts: ChildrenOutletContexts) {
  }

  getRouterTransition(outlet: RouterOutlet) {
    return outlet.activatedRouteData?.['state'];
  }
  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
