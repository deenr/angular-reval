import {Component} from '@angular/core';
import {Color} from '@shared/enums/general/colors.enum';
import {StubResearchDevice} from '@shared/models/research-device/stub-research-device';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent {
  public greenColor = Color.GREEN;
  public redColor = Color.ROSE;
  public researchDevices = StubResearchDevice.createAmountOfResearchDevices(20);
}
