import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {CustomDatepickerComponent} from '@custom-components/custom-datepicker/custom-datepicker.component';
import {DividerWithTextComponent} from '@custom-components/divider-with-text/divider-with-text.component';
import {CustomTextInputWithIconComponent} from '@custom-components/custom-text-input-with-icon/custom-text-input-with-icon.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {environment} from 'src/environments/environment.development';
import {ProgressButtonComponent} from '@custom-components/progress-button/progress-button.component';
import {SkeletonComponent} from '@custom-components/skeleton/skeleton.component';
import {EmailVerificationComponent} from '@pages/email-verification/email-verification.component';
import {LandingPageComponent} from '@pages/landing-page/landing-page.component';
import {LoginComponent} from '@pages/login/login.component';
import {RegisterComponent} from '@pages/register/register.component';
import {SkeletonDirective} from '@shared/directives/skeleton/skeleton.directive';
import {ProgressStepsComponent} from '@custom-components/progress-steps/progress-steps.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {FeatureCardComponent} from './pages/landing-page/feature-card/feature-card.component';
import {BreakpointDirective} from './shared/directives/breakpoint/breakpoint.directive';
import {MatExpansionModule} from '@angular/material/expansion';
import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
import {MatTabsModule} from '@angular/material/tabs';
import {NavigationHeaderComponent} from './custom-components/navigation-header/navigation-header.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NavigationSidebarComponent } from './custom-components/navigation-header/navigation-sidebar/navigation-sidebar.component';
import { FooterComponent } from './custom-components/footer/footer.component';
import { ContactComponent } from './pages/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomDatepickerComponent,
    LoginComponent,
    ProgressStepsComponent,
    DividerWithTextComponent,
    CustomTextInputWithIconComponent,
    LandingPageComponent,
    ProgressButtonComponent,
    SkeletonComponent,
    SkeletonDirective,
    RegisterComponent,
    EmailVerificationComponent,
    NotFoundComponent,
    FeatureCardComponent,
    BreakpointDirective,
    PrivacyPolicyComponent,
    NavigationHeaderComponent,
    NavigationSidebarComponent,
    FooterComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatExpansionModule,
    MatTabsModule,
    MatSidenavModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline', floatLabel: 'always', subscriptSizing: 'dynamic'}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
