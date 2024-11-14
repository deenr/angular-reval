import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ArticlePreviewComponent } from '@shared/components/article-preview/article-preview.component';
import { DatepickerModule } from '@shared/components/datepicker/datepicker.module';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { ProgressButtonComponent } from '@shared/components/progress-button/progress-button.component';
import { TableModule } from '@shared/components/table/table.module';
import { HasErrorDirective } from '@shared/directives/has-error/has-error.directive';
import { SkeletonDirective } from '@shared/directives/skeleton/skeleton.directive';
import { TranslatePipe } from '@shared/pipes/translate/translate.pipe';
import { AdminRoutingModule } from './admin.routes';
import { InterfaceHeaderComponent } from './components/interface-header/interface-header.component';
import { InterfaceSidebarComponent } from './components/interface-sidebar/interface-sidebar.component';
import { InterfaceComponent } from './layouts/interface/interface.component';
import { AddArticleContentComponent } from './pages/articles/add-article/add-article-content/add-article-content.component';
import { AddArticleGeneralComponent } from './pages/articles/add-article/add-article-general/add-article-general.component';
import { AddArticlePreviewComponent } from './pages/articles/add-article/add-article-preview/add-article-preview.component';
import { AddArticleComponent } from './pages/articles/add-article/add-article.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { SettingsDetailsComponent } from './pages/settings/settings-details/settings-details.component';
import { SettingsPasswordComponent } from './pages/settings/settings-password/settings-password.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
  declarations: [
    InterfaceHeaderComponent,
    InterfaceSidebarComponent,
    InterfaceComponent,
    ArticlesComponent,
    AddArticleComponent,
    AddArticleContentComponent,
    AddArticleGeneralComponent,
    AddArticlePreviewComponent,
    SettingsComponent,
    SettingsDetailsComponent,
    SettingsPasswordComponent,
    UsersComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    TableModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    FileUploadComponent,
    DragDropModule,
    ArticlePreviewComponent,
    HeaderComponent,
    ProgressButtonComponent,
    TranslatePipe,
    SkeletonDirective,
    MatInputModule,
    HasErrorDirective,
    DatepickerModule
  ]
})
export class AdminModule {}
