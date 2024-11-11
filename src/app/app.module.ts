import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { DividerWithTextComponent } from '@custom-components/divider-with-text/divider-with-text.component';
import { AppRoutingModule } from './app-routing.module';
import { ProgressButtonComponent } from '@custom-components/progress-button/progress-button.component';
import { SkeletonComponent } from '@custom-components/skeleton/skeleton.component';
import { SkeletonDirective } from '@shared/directives/skeleton/skeleton.directive';
import { ProgressStepsComponent } from '@custom-components/progress-steps/progress-steps.component';
import { BreakpointDirective } from './shared/directives/breakpoint/breakpoint.directive';
import { MatExpansionModule } from '@angular/material/expansion';
import { MAT_TABS_CONFIG, MatTabsModule } from '@angular/material/tabs';
import { NavigationHeaderComponent } from './custom-components/navigation/navigation-header/navigation-header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationSidebarComponent } from './custom-components/navigation/navigation-sidebar/navigation-sidebar.component';
import { FooterComponent } from './custom-components/footer/footer.component';
import { MetricsSectionComponent } from './custom-components/metrics-section/metrics-section.component';
import { CountUpDirective } from './shared/directives/count-up/count-up.directive';
import { ArticleCardComponent } from './custom-components/article-card/article-card.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationItemComponent } from './custom-components/navigation/navigation-item/navigation-item.component';
import { AuthenticationComponent } from './layouts/authentication/authentication.component';
import { HomeComponent } from './layouts/home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StackedLeftDialogComponent } from './custom-components/dialogs/stacked-left-dialog/stacked-left-dialog.component';
import { PaginatorComponent } from './custom-components/paginator/paginator.component';
import { VerificationCodeInputComponent } from './custom-components/verification-code-input/verification-code-input.component';
import { HasErrorDirective } from './shared/directives/has-error/has-error.directive';
import { InterfaceComponent } from './layouts/interface//interface.component';
import { InterfaceSidebarComponent } from './custom-components/interface/interface-sidebar/interface-sidebar.component';
import { InterfaceHeaderComponent } from './custom-components/interface/interface-header/interface-header.component';
import { TabsComponent } from './custom-components/tabs/tabs.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { HeaderComponent } from './custom-components/header/header.component';
import { MetricsCardComponent } from './custom-components/metrics-card/metrics-card.component';
import { BadgeComponent } from './custom-components/badge/badge.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragScrollDirective } from './shared/directives/drag-scroll/drag-scroll.directive';
import { TableComponent } from './custom-components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslatePipe } from '@shared/pipes/translate/translate.pipe';
import { TableAvatarComponent } from '@custom-components/table/table-avatar/table-avatar.component';
import { FilterComponent } from '@custom-components/filter/filter.component';
import { FilterDialogComponent } from './custom-components/dialogs/filter-dialog/filter-dialog.component';
import { DatepickerModule } from '@custom-components/datepicker/datepicker.module';
import { EmailVerificationComponent } from '@pages/authentication/email-verification/email-verification.component';
import { LoginComponent } from '@pages/authentication/login/login.component';
import { RegisterComponent } from '@pages/authentication/register/register.component';
import { AboutUsComponent } from '@pages/home/about-us/about-us.component';
import { ContactComponent } from '@pages/home/contact/contact.component';
import { FeatureCardComponent } from '@pages/home/landing-page/feature-card/feature-card.component';
import { LandingPageComponent } from '@pages/home/landing-page/landing-page.component';
import { ArticleComponent } from '@pages/home/news/article/article.component';
import { NewsComponent } from '@pages/home/news/news.component';
import { NotFoundComponent } from '@pages/home/not-found/not-found.component';
import { PrivacyPolicyComponent } from '@pages/home/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from '@pages/home/terms-of-service/terms-of-service.component';
import { SettingsDetailsComponent } from '@pages/admin/settings/settings-details/settings-details.component';
import { PasswordComponent } from '@pages/admin/settings/settings-password/settings-password.component';
import { SettingsComponent } from '@pages/admin/settings/settings.component';
import { UsersComponent } from '@pages/admin/users/users.component';
import { ArticlesComponent } from './pages/admin/articles/articles.component';
import { MultipleBadgesComponent } from './custom-components/table/multiple-badges/multiple-badges.component';
import { AddArticleComponent } from './pages/admin/articles/add-article/add-article.component';
import { AddArticleGeneralComponent } from './pages/admin/articles/add-article/add-article-general/add-article-general.component';
import { AddArticlePreviewComponent } from './pages/admin/articles/add-article/add-article-preview/add-article-preview.component';
import { ArticlePreviewComponent } from './custom-components/article-preview/article-preview.component';
import { AddArticleContentComponent } from './pages/admin/articles/add-article/add-article-content/add-article-content.component';
import { FileUploadModule } from '@custom-components/file-upload/file-upload.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EquipmentListComponent } from './pages/admin/equipment/equipment-list.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { EquipmentDetailsComponent } from './pages/admin/equipment/equipment-details/equipment-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProgressStepsComponent,
    DividerWithTextComponent,
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
    FilterDialogComponent,
    ArticlesComponent,
    MultipleBadgesComponent,
    AddArticleComponent,
    AddArticleGeneralComponent,
    AddArticlePreviewComponent,
    ArticlePreviewComponent,
    AddArticleContentComponent,
    EquipmentListComponent,
    EquipmentDetailsComponent
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
    MatPaginatorModule,
    DatepickerModule,
    FileUploadModule,
    MatAutocompleteModule,
    ScrollingModule
  ],
  providers: [
    DatePipe,
    TranslatePipe,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always', subscriptSizing: 'dynamic' }
    },
    {
      provide: MAT_TABS_CONFIG,
      useValue: { stretchTabs: false }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
