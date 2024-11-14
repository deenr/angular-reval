import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslatePipe } from '@shared/pipes/translate/translate.pipe';
import { ARTICLES } from './services/api/articles/articles.interface';
import { SupabaseArticlesService } from './services/api/articles/supabase-articles.service';
import { AUTHENTICATION } from './services/api/authentication/authentication.interface';
import { SupabaseAuthenticationService } from './services/api/authentication/supabase-authentication.service';
import { IMAGES } from './services/api/images/images.interface';
import { SupabaseImagesService } from './services/api/images/supabase-images.service';
import { SupabaseUsersService } from './services/api/users/supabase-users.service';
import { USERS } from './services/api/users/users.interface';

@NgModule({
  imports: [CommonModule, HttpClientModule, BrowserAnimationsModule],
  providers: [
    { provide: AUTHENTICATION, useClass: SupabaseAuthenticationService },
    { provide: ARTICLES, useClass: SupabaseArticlesService },
    { provide: IMAGES, useClass: SupabaseImagesService },
    { provide: USERS, useClass: SupabaseUsersService },
    TranslatePipe
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
