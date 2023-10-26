import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {Color} from '@shared/enums/general/colors.enum';
import {ResearchDevice} from '@shared/models/research-device/research-device.model';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.scss']
})
export class EquipmentDetailsComponent implements AfterViewInit {
  @Input() public device: ResearchDevice;
  @Output() public close = new EventEmitter<void>();

  public greenColor = Color.GREEN;
  public redColor = Color.ROSE;

  public ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementsByClassName('mat-sidenav equipment-details')[0].children[0].scrollTo({top: 1, left: 0, behavior: 'smooth'});
    });
  }
}
