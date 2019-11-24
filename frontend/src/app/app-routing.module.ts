import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',
    children: [
      {
        path: '',
        loadChildren: './pages/home/home.module#HomePageModule',
      },
      {
        path: ':postId',
        loadChildren: './pages/post-detail/post-detail.module#PostDetailPageModule'
      }
      ]
     },
  {
    path: 'login-user', loadChildren: './pages/login-user/login-user.module#LoginUserPageModule'},
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule'},
  { path: 'profile',
    children: [
      {
        path: '',
        loadChildren: './pages/profile/profile.module#ProfilePageModule'
      },
      {
        path: ':postId',
        loadChildren: './pages/post-detail/post-detail.module#PostDetailPageModule'
      }
    ]
  },
  ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
