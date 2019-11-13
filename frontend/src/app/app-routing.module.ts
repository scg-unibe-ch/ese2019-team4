import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  {
    path: 'login-user',
    children: [
      {
        path: '',
        loadChildren: './pages/login-user/login-user.module#LoginUserPageModule'
      },
      {
        path: 'register-consumer', loadChildren: './pages/login-user/register-consumer/register-consumer.module#RegisterConsumerPageModule'
      }
    ]
  },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfilePageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
