import { Component } from '@angular/core';
import { CarpetsComponent } from "../carpets/carpets.component";
import { NgStyle } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    imports: [
      NgStyle,
      CarpetsComponent,
      RouterModule
    ]
})
export class MainComponent {
  
}
