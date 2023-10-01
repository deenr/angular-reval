import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Output() public fileSelected = new EventEmitter<File>();

  public fileName = '';

  public onFileSelected(event: any) {
    const file = event.target.files[0] as File;

    if (file) {
      this.fileSelected.emit(file);
    }
  }
}
