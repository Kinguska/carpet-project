import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MediaMatcher} from '@angular/cdk/layout';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    CommonModule,
    NgIf,
    NgStyle
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  mobileQuery: MediaQueryList;
  ishidden = false;

  @Input() loggedInUser?: firebase.default.User | null;
  @Output() onLogout:EventEmitter<boolean> = new EventEmitter();

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(logout: boolean) {
    if (logout === true) {
    this.onLogout.emit(logout);
    }
  }

}
