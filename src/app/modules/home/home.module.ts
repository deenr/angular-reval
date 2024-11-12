import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ArticleCardComponent } from '@shared/components/article-card/article-card.component';
import { ArticlePreviewComponent } from '@shared/components/article-preview/article-preview.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { MetricsSectionComponent } from '@shared/components/metrics-section/metrics-section.component';
import { SkeletonDirective } from '@shared/directives/skeleton/skeleton.directive';
import { ArticleComponent } from './components/article/article.component';
import { FeatureCardComponent } from './components/feature-card/feature-card.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';
import { NavigationSidebarComponent } from './components/navigation-sidebar/navigation-sidebar.component';
import { HomeRoutingModule } from './home.routes';
import { HomeComponent } from './layouts/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NewsComponent } from './pages/news/news.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavigationHeaderComponent,
    NavigationItemComponent,
    NavigationSidebarComponent,
    FeatureCardComponent,
    ArticleComponent,
    AboutUsComponent,
    ContactComponent,
    LandingPageComponent,
    NewsComponent,
    NotFoundComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatDialogModule,
    MatSidenavModule,
    MatDividerModule,
    MetricsSectionComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ArticlePreviewComponent,
    ArticleCardComponent,
    FooterComponent,
    MatCheckboxModule,
    SkeletonDirective
  ]
})
export class HomeModule {}
