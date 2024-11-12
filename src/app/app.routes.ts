import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/authentication/authentication.module').then((m) => m.AuthenticationModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
