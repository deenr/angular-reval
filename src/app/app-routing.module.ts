import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from '@layouts/authentication/authentication.component';
import {HomeComponent} from '@layouts/home/home.component';
import {InterfaceComponent} from '@layouts/interface/interface.component';
import {SettingsComponent} from '@pages/interface/settings/settings.component';
import {canActivateInterface} from '@shared/guard/auth.guard';
import {EmailVerificationComponent} from '@pages/authentication/email-verification/email-verification.component';
import {LoginComponent} from '@pages/authentication/login/login.component';
import {RegisterComponent} from '@pages/authentication/register/register.component';
import {AboutUsComponent} from '@pages/home/about-us/about-us.component';
import {ContactComponent} from '@pages/home/contact/contact.component';
import {LandingPageComponent} from '@pages/home/landing-page/landing-page.component';
import {ArticleComponent} from '@pages/home/news/article/article.component';
import {NewsComponent} from '@pages/home/news/news.component';
import {NotFoundComponent} from '@pages/home/not-found/not-found.component';
import {PrivacyPolicyComponent} from '@pages/home/privacy-policy/privacy-policy.component';
import {TermsOfServiceComponent} from '@pages/home/terms-of-service/terms-of-service.component';
import {UsersComponent} from '@pages/interface/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: '', component: LandingPageComponent},
      {path: 'privacy', component: PrivacyPolicyComponent},
      {path: 'terms', component: TermsOfServiceComponent},
      {path: 'not-found', component: NotFoundComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'about', component: AboutUsComponent},
      {path: 'news', component: NewsComponent},
      {path: 'news/:id', component: ArticleComponent}
    ]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'verify', component: EmailVerificationComponent}
    ]
  },
  {
    path: 'app',
    component: InterfaceComponent,
    canActivate: [canActivateInterface],
    children: [
      {path: 'settings', component: SettingsComponent},
      {path: 'settings/:id', component: SettingsComponent},
      {path: 'users', component: UsersComponent},
      {path: 'users/:id', component: UsersComponent}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
