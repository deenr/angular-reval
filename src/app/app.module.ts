import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, RouterModule, BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
