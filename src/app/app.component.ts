import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'OCCAVERSE';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Track route changes for analytics
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Add your analytics tracking here
        console.log('Navigation to:', event.url);
      });
  }
}
