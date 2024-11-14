import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@shared/pipes/translate/translate.pipe';
import { BadgeComponent } from '../badge/badge.component';
import { DatepickerModule } from '../datepicker/datepicker.module';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { FilterComponent } from './filter.component';

@NgModule({
  declarations: [FilterComponent, FilterDialogComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    DatepickerModule,
    BadgeComponent,
    TranslatePipe
  ],
  exports: [FilterComponent, FilterDialogComponent]
})
export class FilterModule {}
