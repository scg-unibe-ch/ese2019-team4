import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  {
    path: 'login-user', loadChildren: './pages/login-user/login-user.module#LoginUserPageModule'},
  { path: 'register', loadChildren: './pages/register-consumer/register-consumer.module#RegisterConsumerPageModule'},
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
