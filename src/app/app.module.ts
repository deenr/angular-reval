import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { LoginComponent } from './login/login.component';
import { ProgressStepsComponent } from './progress-steps/progress-steps.component';
import { RegisterComponent } from './register/register.component';
import { DividerWithTextComponent } from './divider-with-text/divider-with-text.component';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomInputComponent,
    DatepickerComponent,
    LoginComponent,
    ProgressStepsComponent,
    RegisterComponent,
    DividerWithTextComponent,
    CustomDropdownComponent,
  ],
  imports: [
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
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
