import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogType} from '../dialog-type.enum';
import {Router} from '@angular/router';

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
  public cancelRoute: string;
  public confirmRoute: string;

  public constructor(
    public dialogRef: MatDialogRef<StackedLeftDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      type: DialogType;
      icon: string;
      title: string;
      description: string;
      cancelRoute: string;
      confirmRoute: string;
    },
    private readonly router: Router
  ) {
    this.type = data.type;
    this.icon = data.icon;
    this.title = data.title;
    this.description = data.description;
    this.cancelRoute = data.cancelRoute;
    this.confirmRoute = data.confirmRoute;
  }

  public cancel(): void {
    if (this.cancelRoute) {
      this.router.navigateByUrl(this.cancelRoute);
    }
    this.dialogRef.close();
  }

  public confirm(): void {
    if (this.confirmRoute) {
      this.router.navigateByUrl(this.confirmRoute);
    }
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
