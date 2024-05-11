import { JsonPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CarpetsComponent } from '../carpets/carpets.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Carpet } from '../../shared/models/Carpet';
import { CarpetService } from '../../shared/services/carpet.service';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../shared/services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { BuyinfoService } from '../../shared/services/buyinfo.service';
import { BuyInfo } from '../../shared/models/BuyInfo';
import { DatepipePipe } from '../../shared/pipes/datepipe.pipe';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-carpetviewer',
    standalone: true,
    templateUrl: './carpetviewer.component.html',
    styleUrl: './carpetviewer.component.scss',
    imports: [
        MatCardModule,
        NgStyle,
        NgClass,
        NgFor,
        NgIf,
        CarpetsComponent,
        RouterModule,
        FormsModule,
        MatButtonModule,
        MatIcon,
        JsonPipe,
        DatepipePipe
    ]
})
export class CarpetviewerComponent implements OnInit, OnDestroy {
  loggedInUser?: firebase.default.User | null;

  choosenCarpet: Carpet | undefined;

  getBuyInfo: BuyInfo | undefined;

  userSubcsription: Subscription | undefined;
  carpetSubcsription: Subscription | undefined;

  buyInfo: BuyInfo = {
    user: '',
    date: new Date(),
    carpet: ''
  };

  constructor(private route: ActivatedRoute, private carpetService: CarpetService, 
    private router: Router, private authService: AuthService, private buyInfoService: BuyinfoService){
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const carpetName = routeParams.get('name');
    //console.log(carpetName);
    if (carpetName) {
      this.carpetSubcsription = this.carpetService.getCarpet(carpetName)
        .subscribe(carpet => {
          //console.log(carpet);
          this.choosenCarpet = carpet.data() as Carpet;
          //console.log(this.choosenCarpet.user);

          this.getInfo();
        });
    }
    this.userSubcsription = this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      //console.log(user)
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    })
  }

  ngOnDestroy() {
    this.userSubcsription?.unsubscribe();
    this.carpetSubcsription?.unsubscribe();
  }

  buyCarpet(carpet: Carpet, e: Event) {
    carpet.bought = true;

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

  deleteCarpet(carpet: Carpet) {
    this.carpetService.deleteCarpet(carpet.name);
    this.router.navigateByUrl('/');
  }

  getInfo(){
    this.buyInfoService.getQueryBuyInfo(this.choosenCarpet!.name).subscribe(buyInfo => {
      console.log(buyInfo);
      this.getBuyInfo = buyInfo.docs[0]?.data() as BuyInfo | undefined;
    });
  }

}
