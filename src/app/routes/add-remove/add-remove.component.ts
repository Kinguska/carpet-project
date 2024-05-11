import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Router } from '@angular/router';
import { Carpet } from '../../shared/models/Carpet';
import { CarpetService } from '../../shared/services/carpet.service';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-remove',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-remove.component.html',
  styleUrl: './add-remove.component.scss'
})
export class AddRemoveComponent {
  loggedInUser?: firebase.default.User | null;

  userSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private router: Router, private carpetService: CarpetService, private authService: AuthService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      console.log(user)
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
  })
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
  
  addForm = this.createForm({
    name: '',
    image_url: '',
    color: '',
    type: '',
    from: '',
    price: 0,
    user: '',
    bought: false
  });

  createForm(model: Carpet) {
    let formGroup = this.fb.group(model);

    formGroup.get('name')?.addValidators([Validators.required]);
    formGroup.get('image_url')?.addValidators([Validators.required]);
    formGroup.get('color')?.addValidators([Validators.required]);
    formGroup.get('from')?.addValidators([Validators.required]);
    formGroup.get('price')?.addValidators([Validators.required]);

    return formGroup;
  }

  addCarpet() {
    console.log(this.loggedInUser)

    if (this.addForm.invalid) {
      alert('Invalid form');
      return;
    }
    
    if (this.addForm.value.name === '' || this.addForm.value.image_url === '' || this.addForm.value.color === '' || this.addForm.value.from === '' || this.addForm.value.price === 0) {
      alert('Please fill in all fields');
      return;
    }

    firstValueFrom(this.carpetService.getAllCarpets())
      .then((carpets) => {
        if (carpets.find(carpet => carpet.name === this.addForm.value.name)) {
          alert('Carpet with this name already exists');
          return;
        }

        const carpet: Carpet = {
          name: this.addForm.value.name!,
          image_url: "assets/images/" + this.addForm.value.image_url! + ".jpg",
          color: this.addForm.value.color!,
          type: this.addForm.value.type!,
          from: this.addForm.value.from!,
          price: this.addForm.value.price!,
          user: this.loggedInUser?.email!,
          bought: false
        };
        this.carpetService.createCarpet(carpet).then(() => {
          alert('Carpet added');
          this.router.navigateByUrl('/');
          return;
        }
        ).catch(e => {
          console.error('Carpet creation failed');
        });
      })
  }

}
