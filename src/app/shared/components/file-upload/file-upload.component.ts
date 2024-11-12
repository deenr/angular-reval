import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  imports: [MatIconModule]
})
export class FileUploadComponent {
  @Input() public invalid: boolean;
  @Output() public fileSelected = new EventEmitter<File>();

  public fileName = '';

  public onFileSelected(event: any) {
    const file = event.target.files[0] as File;

    if (file) {
      this.fileSelected.emit(file);
    }
  }
}
