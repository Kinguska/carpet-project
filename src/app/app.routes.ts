import { Routes } from '@angular/router';
import { MainComponent } from './routes/main/main.component';
import { LoginComponent } from './routes/login/login.component';
import { SignupComponent } from './routes/signup/signup.component';
import { AddRemoveComponent } from './routes/add-remove/add-remove.component';
import { CarpetsComponent } from './routes/carpets/carpets.component';
import { CarpetviewerComponent } from './routes/carpetviewer/carpetviewer.component';
import { authguardGuard } from './shared/services/authguard.guard';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'add',
        component: AddRemoveComponent,
        canActivate: [authguardGuard],

    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: '',
        component: CarpetsComponent
    },
    {
        path: 'carpet/:name',
        component: CarpetviewerComponent,
        canActivate: [authguardGuard]
    }
];
