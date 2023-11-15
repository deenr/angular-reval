import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddReservationDialogComponent} from '@custom-components/dialogs/add-reservation-dialog/add-reservation-dialog.component';
import {DialogCloseType} from '@custom-components/dialogs/dialog-close-type.enum';
import {Color} from '@shared/enums/general/colors.enum';
import {ResearchDevice} from '@shared/models/research-device/research-device.model';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.scss']
})
export class EquipmentDetailsComponent implements OnInit, AfterViewInit {
  @Input() public device: ResearchDevice;
  @Output() public close = new EventEmitter<void>();

  public greenColor = Color.GREEN;
  public redColor = Color.ROSE;

  private isMobile: boolean;

  public constructor(private readonly dialog: MatDialog, private readonly breakpointService: BreakpointService) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe(() => {
      this.isMobile = this.breakpointService.isMobile;
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementsByClassName('mat-sidenav equipment-details')[0].children[0].scrollTo({top: 1, left: 0, behavior: 'smooth'});
    });
  }

  public addReservation(): void {
    this.dialog
      .open(AddReservationDialogComponent, {
        width: this.isMobile ? 'calc(100vw - 32px)' : '800px',
        maxWidth: this.isMobile ? 'calc(100vw - 32px)' : 'unset',
        data: {
          device: this.device
        }
      })
      .afterClosed()
      .subscribe((closeType: DialogCloseType) => {});
  }
}
