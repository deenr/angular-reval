import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/auth/auth.guard';
import { InterfaceComponent } from './layouts/interface/interface.component';
import { AddArticleComponent } from './pages/articles/add-article/add-article.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: 'admin',
    component: InterfaceComponent,
    canActivate: [authGuard],
    children: [
      { path: 'settings', component: SettingsComponent },
      { path: 'settings/:id', component: SettingsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/:id', component: AddUserComponent },
      { path: '', component: ArticlesComponent },
      { path: 'articles/add', component: AddArticleComponent },
      { path: 'articles/:id', component: AddArticleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
