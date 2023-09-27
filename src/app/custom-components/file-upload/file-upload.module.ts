import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FileUploadComponent} from './file-upload.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatIconModule],
  exports: [FileUploadComponent],
  declarations: [FileUploadComponent]
})
export class FileUploadModule {}
