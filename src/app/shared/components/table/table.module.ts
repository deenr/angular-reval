import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SkeletonDirective } from '@shared/directives/skeleton/skeleton.directive';
import { TranslatePipe } from '@shared/pipes/translate/translate.pipe';
import { BadgeComponent } from '../badge/badge.component';
import { FilterModule } from '../filter/filter.module';
import { MultipleBadgesComponent } from './multiple-badges/multiple-badges.component';
import { TableAvatarComponent } from './table-avatar/table-avatar.component';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [TableComponent, MultipleBadgesComponent, TableAvatarComponent],
  imports: [CommonModule, BadgeComponent, MatIconModule, FilterModule, MatPaginatorModule, MatIconModule, SkeletonDirective, MatMenuModule, MatTableModule, MatSortModule, TranslatePipe],
  exports: [TableComponent]
})
export class TableModule {}
