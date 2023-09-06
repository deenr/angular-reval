import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {LayoutModule} from '@angular/cdk/layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {CustomDatepickerComponent} from '@custom-components/custom-datepicker/custom-datepicker.component';
import {DividerWithTextComponent} from '@custom-components/divider-with-text/divider-with-text.component';
import {CustomTextInputWithIconComponent} from '@custom-components/custom-text-input-with-icon/custom-text-input-with-icon.component';
import {AppRoutingModule} from './app-routing.module';
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
import {MAT_TABS_CONFIG, MatTabsModule} from '@angular/material/tabs';
import {NavigationHeaderComponent} from './custom-components/navigation/navigation-header/navigation-header.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NavigationSidebarComponent} from './custom-components/navigation/navigation-sidebar/navigation-sidebar.component';
import {FooterComponent} from './custom-components/footer/footer.component';
import {ContactComponent} from './pages/contact/contact.component';
import {AboutUsComponent} from './pages/about-us/about-us.component';
import {MetricsSectionComponent} from './custom-components/metrics-section/metrics-section.component';
import {CountUpDirective} from './shared/directives/count-up/count-up.directive';
import {NewsComponent} from './pages/news/news.component';
import {ArticleCardComponent} from './custom-components/article-card/article-card.component';
import {ArticleComponent} from './pages/news/article/article.component';
import {TermsOfServiceComponent} from './pages/terms-of-service/terms-of-service.component';
import {MatMenuModule} from '@angular/material/menu';
import {NavigationItemComponent} from './custom-components/navigation/navigation-item/navigation-item.component';
import {AuthenticationComponent} from './layouts/authentication/authentication.component';
import {HomeComponent} from './layouts/home/home.component';
import {MatDialogModule} from '@angular/material/dialog';
import {StackedLeftDialogComponent} from './custom-components/dialogs/stacked-left-dialog/stacked-left-dialog.component';
import {PaginatorComponent} from './custom-components/paginator/paginator.component';
import {VerificationCodeInputComponent} from './custom-components/verification-code-input/verification-code-input.component';
import {HasErrorDirective} from './shared/directives/has-error/has-error.directive';
import {InterfaceComponent} from './layouts/interface//interface.component';
import {InterfaceSidebarComponent} from './custom-components/interface/interface-sidebar/interface-sidebar.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {SettingsDetailsComponent} from '@pages/settings/settings-details/settings-details.component';
import {InterfaceHeaderComponent} from './custom-components/interface/interface-header/interface-header.component';
import {TabsComponent} from './custom-components/tabs/tabs.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {PasswordComponent} from './pages/settings/settings-password/settings-password.component';
import {MatChipsModule} from '@angular/material/chips';
import {UsersComponent} from './pages/users/users.component';
import {HeaderComponent} from './custom-components/header/header.component';
import {MetricsCardComponent} from './custom-components/metrics-card/metrics-card.component';
import {BadgeComponent} from './custom-components/badge/badge.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DragScrollDirective} from './shared/directives/drag-scroll/drag-scroll.directive';
import {TableComponent} from './custom-components/table/table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {TranslatePipe} from '@shared/pipes/translate/translate.pipe';
import {TableAvatarComponent} from '@custom-components/table/table-avatar/table-avatar.component';
import {FilterComponent} from '@custom-components/filter/filter.component';
import { FilterDialogComponent } from './custom-components/dialogs/filter-dialog/filter-dialog.component';

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
    ContactComponent,
    AboutUsComponent,
    MetricsSectionComponent,
    CountUpDirective,
    NewsComponent,
    ArticleCardComponent,
    ArticleComponent,
    TermsOfServiceComponent,
    NavigationItemComponent,
    AuthenticationComponent,
    HomeComponent,
    StackedLeftDialogComponent,
    SettingsDetailsComponent,
    PaginatorComponent,
    VerificationCodeInputComponent,
    HasErrorDirective,
    InterfaceComponent,
    InterfaceSidebarComponent,
    SettingsComponent,
    InterfaceHeaderComponent,
    TabsComponent,
    PasswordComponent,
    UsersComponent,
    HeaderComponent,
    MetricsCardComponent,
    BadgeComponent,
    DragScrollDirective,
    TableComponent,
    FilterComponent,
    TableAvatarComponent,
    TranslatePipe,
    FilterDialogComponent
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
    MatExpansionModule,
    MatTabsModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule,
    LayoutModule,
    MatTabsModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule,
    DragDropModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline', floatLabel: 'always', subscriptSizing: 'dynamic'}
    },
    {
      provide: MAT_TABS_CONFIG,
      useValue: {stretchTabs: false}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
