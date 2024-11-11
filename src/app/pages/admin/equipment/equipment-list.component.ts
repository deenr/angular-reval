import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FilterProperty, FilterType } from '@custom-components/table/builder/filter-builder';
import { ArchitectureAndArtsProgram } from '@shared/enums/faculty-and-department/architecture-and-arts-program.enum';
import { BusinessProgram } from '@shared/enums/faculty-and-department/business-program.enum';
import { EngineeringTechnologyProgram } from '@shared/enums/faculty-and-department/engineering-technology-program.enum';
import { LawProgram } from '@shared/enums/faculty-and-department/law-program.enum';
import { MedicineAndLifeProgram } from '@shared/enums/faculty-and-department/medicine-and-life-program.enum';
import { Program } from '@shared/enums/faculty-and-department/program.type';
import { RehabilitationSciencesProgram } from '@shared/enums/faculty-and-department/rehabilitation-sciences-program.enum';
import { SciencesProgram } from '@shared/enums/faculty-and-department/sciences-program.enum';
import { SocialSciencesProgram } from '@shared/enums/faculty-and-department/social-sciences-program.enum';
import { TransportationSciencesProgram } from '@shared/enums/faculty-and-department/transportation-sciences-program.enum';
import { ResearchDeviceType } from '@shared/enums/research-device/research-device-type.enum';
import { ResearchDevice } from '@shared/models/research-device/research-device.model';
import { StubResearchDevice } from '@shared/models/research-device/stub-research-device';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  public researchDevices: ResearchDevice[];
  public filteredDevices: ResearchDevice[];
  public selectedDevice: ResearchDevice;

  public filters: FilterProperty[] = [
    {
      type: FilterType.TEXT,
      field: 'name'
    },
    {
      type: FilterType.ENUM,
      field: 'type',
      enumValues: Object.keys(ResearchDeviceType),
      translationKey: 'RESEARCH_DEVICE_TYPE'
    },
    {
      type: FilterType.ENUM,
      field: 'program',
      enumValues: [
        ...Object.keys(ArchitectureAndArtsProgram),
        ...Object.keys(BusinessProgram),
        ...Object.keys(EngineeringTechnologyProgram),
        ...Object.keys(LawProgram),
        ...Object.keys(MedicineAndLifeProgram),
        ...Object.keys(RehabilitationSciencesProgram),
        ...Object.keys(SciencesProgram),
        ...Object.keys(SocialSciencesProgram),
        ...Object.keys(TransportationSciencesProgram)
      ],
      translationKey: 'PROGRAM'
    }
  ];

  public ngOnInit(): void {
    this.researchDevices = StubResearchDevice.createAmountOfResearchDevices(20);
    this.onFilterChange(null);
  }

  public selectDevice(device: ResearchDevice): void {
    this.selectedDevice = device;
    this.sidenav.open();
  }

  public onFilterChange(filterValues: { name: string; type: ResearchDeviceType[]; program: Program[] }): void {
    const filteredDevices = this.researchDevices
      .filter((device: ResearchDevice) => (filterValues?.name ? device.name.toLowerCase().includes(filterValues.name.toLowerCase()) : true))
      .filter((device: ResearchDevice) => (filterValues?.type && filterValues.type.length > 0 ? filterValues.type.some((type: ResearchDeviceType) => type === device.type) : true))
      .filter((device: ResearchDevice) =>
        filterValues?.program && filterValues.program.length > 0
          ? filterValues.program.some((program: Program) => device.relatedPrograms.some((relatedProgram: Program) => program === relatedProgram))
          : true
      );

    this.filteredDevices = filteredDevices;
  }

  public closeSidenav(): void {
    this.selectedDevice = null;
    this.sidenav.close();
  }
}
