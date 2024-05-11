import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Carpet } from '../../shared/models/Carpet';
import { AsyncPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarpetviewerComponent } from "../carpetviewer/carpetviewer.component";
import { Observable, Subscription } from 'rxjs';
import { CarpetService } from '../../shared/services/carpet.service';
import { AuthService } from '../../shared/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BuyInfo } from '../../shared/models/BuyInfo';
import { BuyinfoService } from '../../shared/services/buyinfo.service';
import { DatepipePipe } from '../../shared/pipes/datepipe.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
    selector: 'app-carpets',
    standalone: true,
    templateUrl: './carpets.component.html',
    styleUrl: './carpets.component.scss',
    imports: [
        MatCardModule,
        NgStyle,
        NgClass,
        NgFor,
        NgIf,
        RouterModule,
        FormsModule,
        CarpetviewerComponent,
        AsyncPipe,
        MatButtonModule,
        MatIcon,
        MatCheckboxModule
    ]
})
export class CarpetsComponent implements OnInit, OnDestroy{
  loggedInUser?: firebase.default.User | null;

  buyInfo: BuyInfo = {
    user: '',
    date: new Date(),
    carpet: ''
  };

  choosenCarpet: any;

  carpets$: Observable<Carpet[]>;

  checked = false;

  userSubcsription: Subscription | undefined;

  constructor(private router: Router, private carpetService: CarpetService, 
    private authService: AuthService, private buyInfoService: BuyinfoService) {

    
    this.carpets$ = carpetService.getAllCarpets();
  }

  ngOnInit() {
    this.userSubcsription = this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      //console.log(user)
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
  })
  }

  ngOnDestroy(): void {
    this.userSubcsription?.unsubscribe();
  }

  selectCarpet() {
  }

  justcanbuy() {
    if(this.checked == false) {
      this.carpets$ = this.carpetService.getAllCarpets(true);
      this.checked = true;
    }
    else {
      this.carpets$ = this.carpetService.getAllCarpets();
      this.checked = false;
    }  
  }

  deleteCarpet(carpet: Carpet, e: Event) {
    this.carpetService.deleteCarpet(carpet.name).then(() => {
      alert('Carpet deleted successfully');
      this.router.navigateByUrl('/');
      e.stopPropagation();  
    }
    ).catch(error => {
      console.error(error);
      alert('Error deleting carpet');
    });
  }

  buyCarpet(carpet: Carpet, e: Event) {
    carpet.bought = true

    this.buyInfo.user = this.loggedInUser?.email!;
    this.buyInfo.date = DatepipePipe.prototype.transform(new Date());
    this.buyInfo.carpet = carpet.name;
    this.buyInfoService.createBuyInfo(this.buyInfo);

    this.carpetService.updateCarpet(carpet).then(() => {
      alert('Carpet bought successfully');
      this.router.navigateByUrl('/');
      e.stopPropagation();
    }).catch(error => {
      console.error(error);
      alert('Error buying carpet');
    });
  }
  
}
