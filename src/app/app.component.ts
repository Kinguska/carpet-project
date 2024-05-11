import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidenavComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'carpet-project';
  loggedInUser?: firebase.default.User | null;

  userSubcsription: Subscription | undefined;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.userSubcsription = this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      console.log(user)
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    })
  }

  ngOnDestroy(): void {
    this.userSubcsription?.unsubscribe();
  }

  logout(_: boolean) {
    this.authService.logout().then(() => {
      alert('Logout successful');
      this.router.navigate(['/login']);
    }).catch(e => {
      alert('Logout failed');
    });
  }


}
