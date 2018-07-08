import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent {
  user: any;

  constructor(
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}

