import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatepickerMenuComponent } from './datepicker-menu/datepicker-menu.component';
import { DatepickerInputComponent } from './datepicker-input/datepicker-input.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, MatMenuModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatDialogModule],
  exports: [DatepickerMenuComponent, DatepickerInputComponent],
  providers: [DatePipe, { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: [] }],
  declarations: [DatepickerMenuComponent, DatepickerInputComponent]
})
export class DatepickerModule {}
