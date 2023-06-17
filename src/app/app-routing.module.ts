import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {EmailVerificationComponent} from '@pages/email-verification/email-verification.component';
import {LandingPageComponent} from '@pages/landing-page/landing-page.component';
import {LoginComponent} from '@pages/login/login.component';
import {RegisterComponent} from '@pages/register/register.component';
import {NotFoundComponent} from '@pages/not-found/not-found.component';
import {PrivacyPolicyComponent} from '@pages/privacy-policy/privacy-policy.component';
import {ContactComponent} from '@pages/contact/contact.component';
import {AboutUsComponent} from '@pages/about-us/about-us.component';
import {NewsComponent} from '@pages/news/news.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'verify', component: EmailVerificationComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'privacy', component: PrivacyPolicyComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutUsComponent},
  {path: 'news', component: NewsComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
