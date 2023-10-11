import {ResearchDeviceType} from '@shared/enums/research-device/research-device-type.enum';
import {ResearchDevice} from './research-device.model';
import {SciencesProgram} from '@shared/enums/faculty-and-department/sciences-program.enum';
import {BusinessProgram} from '@shared/enums/faculty-and-department/business-program.enum';

export class StubResearchDevice {
  public static getRandomResearchDevice(): ResearchDevice {
    return this.getRandomResearchDeviceWithId('1');
  }

  public static getRandomResearchDeviceWithId(id: string): ResearchDevice {
    const name = MACHINE_NAMES[Math.round(Math.random() * (MACHINE_NAMES.length - 1))];
    const type = this.getRandomEnumValue(ResearchDeviceType);
    const purchaseDate = this.getRandomDateWithinOneMonthRange();
    const purchasePrice = `${Math.floor(Math.random() * 90000) + 10000}`;
    const annualCost = `${Math.floor(1000 + Math.random() * 9000)}`;
    const location = 'Lab';
    const relatedPrograms = [this.getRandomEnumValue(SciencesProgram), this.getRandomEnumValue(BusinessProgram)];

    return new ResearchDevice(id, name, type, purchaseDate, purchasePrice, annualCost, location, relatedPrograms, parseInt(id) % 2 === 0);
  }

  public static createAmountOfResearchDevices(amount: number): ResearchDevice[] {
    const researchDevices: ResearchDevice[] = [];

    for (let i = 0; i < amount; i++) {
      researchDevices.push(this.getRandomResearchDeviceWithId(`${i + 1}`));
    }

    return researchDevices;
  }

  private static getRandomDateWithinOneMonthRange(): Date {
    const currentDate = new Date();

    const minDate = new Date(currentDate);
    minDate.setMonth(currentDate.getMonth() - 1);

    const maxDate = new Date(currentDate);
    maxDate.setMonth(currentDate.getMonth() + 1);

    const randomTimestamp = minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime());
    const randomDate = new Date(randomTimestamp);

    return randomDate;
  }

  private static getRandomEnumValue<T>(enumObj: T): T[keyof T] {
    const enumValues = Object.values(enumObj);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  }
}

const MACHINE_NAMES = [
  'Microscope',
  'Spectrometer',
  'Particle Accelerator',
  'Telescope',
  'Electron Microscope',
  'NMR Spectrometer',
  'Mass Spectrometer',
  'X-ray Diffraction Machine',
  'DNA Sequencer',
  'Chromatograph',
  'Climate Simulator',
  'Geiger Counter',
  'Superconducting Quantum Interference Device',
  'Fusion Reactor',
  'Neutron Generator',
  'Cryostat',
  'Electroencephalogram (EEG) Machine',
  'Fluorometer',
  'Gas Chromatograph-Mass Spectrometer',
  'Seismomete'
];
