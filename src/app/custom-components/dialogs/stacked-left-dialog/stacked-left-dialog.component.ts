import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogType} from '../dialog-type.enum';

@Component({
  selector: 'app-stacked-left-dialog',
  templateUrl: './stacked-left-dialog.component.html',
  styleUrls: ['./stacked-left-dialog.component.scss']
})
export class StackedLeftDialogComponent {
  public type: DialogType;
  public icon: string;
  public title: string;
  public description: string;

  public constructor(public dialogRef: MatDialogRef<StackedLeftDialogComponent>, @Inject(MAT_DIALOG_DATA) public readonly data: {type: DialogType; icon: string; title: string; description: string}) {
    this.type = data.type;
    this.icon = data.icon;
    this.title = data.title;
    this.description = data.description;
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public getConfirmButtonClass(): string {
    return this.type === DialogType.ERROR ? 'warn' : 'primary';
  }

  public getIconClass(): string {
    switch (this.type) {
      case DialogType.ERROR:
        return 'featured-icon-error';
      case DialogType.SUCCESS:
        return 'featured-icon-success';
      case DialogType.INFORMATION:
        return 'featured-icon-primary';
      case DialogType.WARNING:
        return 'featured-icon-warning';
      case DialogType.INFORMATION:
        return 'featured-icon-primary';
    }
  }
}
