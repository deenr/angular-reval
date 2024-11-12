import { BusinessProgram } from '@shared/enums/faculty-and-department/business-program.enum';
import { SciencesProgram } from '@shared/enums/faculty-and-department/sciences-program.enum';
import { ResearchDeviceType } from '@shared/enums/research-device/research-device-type.enum';
import { ResearchDevice } from './research-device.model';

export class StubResearchDevice {
  public static getRandomResearchDevice(): ResearchDevice {
    return this.getRandomResearchDeviceWithId('1');
  }

  public static getRandomResearchDeviceWithId(id: string): ResearchDevice {
    const name = MACHINE_NAMES[Math.round(Math.random() * (MACHINE_NAMES.length - 1))];
    const description =
      'The machine is a cutting-edge research device designed for scientific exploration and experimentation. It serves as an invaluable tool in laboratories and research facilities, enabling researchers to conduct various experiments and data analysis. With its robust capabilities, it empowers scientists to delve into diverse fields, from biology to physics, and plays a pivotal role in advancing our understanding of the natural world.';
    const type = this.getRandomEnumValue(ResearchDeviceType);
    const purchaseDate = this.getRandomDateWithinOneMonthRange();
    const purchasePrice = `${Math.floor(Math.random() * 90000) + 10000}`;
    const annualCost = `${Math.floor(1000 + Math.random() * 9000)}`;
    const location = 'Lab';
    const relatedPrograms = [this.getRandomEnumValue(SciencesProgram), this.getRandomEnumValue(BusinessProgram)];

    return new ResearchDevice(id, name, description, type, purchaseDate, purchasePrice, annualCost, location, relatedPrograms, parseInt(id) % 2 === 0);
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
  'X-ray Machine',
  'DNA Sequencer',
  'Chromatograph',
  'Climate Simulator',
  'Geiger Counter',
  'Superconducting  Device',
  'Fusion Reactor',
  'Neutron Generator',
  'Cryostat',
  'Electroencephalogram',
  'Fluorometer',
  'Gas Spectrometer',
  'Seismomete'
];
