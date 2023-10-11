import {Program} from '@shared/enums/faculty-and-department/program.type';
import {ResearchDeviceType} from '@shared/enums/research-device/research-device-type.enum';

export class ResearchDevice {
  private _id: string;
  private _name: string;
  private _type: ResearchDeviceType;
  private _purchaseDate: Date;
  private _purchasePrice: string;
  private _annualCost: string;
  private _location: string;
  private _relatedPrograms: Program[];
  private _available: boolean;

  public constructor(
    id: string,
    name: string,
    type: ResearchDeviceType,
    purchaseDate: Date,
    purchasePrice: string,
    annualCost: string,
    location: string,
    relatedPrograms: Program[],
    available: boolean
  ) {
    this._id = id;
    this._name = name;
    this._type = type;
    this._purchaseDate = purchaseDate;
    this._purchasePrice = purchasePrice;
    this._annualCost = annualCost;
    this._location = location;
    this._relatedPrograms = relatedPrograms;
    this._available = available;
  }

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get type(): ResearchDeviceType {
    return this._type;
  }

  public set type(type: ResearchDeviceType) {
    this._type = type;
  }

  public get purchaseDate(): Date {
    return this._purchaseDate;
  }

  public set purchaseDate(purchaseDate: Date) {
    this._purchaseDate = purchaseDate;
  }

  public get purchasePrice(): string {
    return this._purchasePrice;
  }

  public set purchasePrice(purchasePrice: string) {
    this._purchasePrice = purchasePrice;
  }

  public get annualCost(): string {
    return this._annualCost;
  }

  public set annualCost(annualCost: string) {
    this._annualCost = annualCost;
  }

  public get location(): string {
    return this._location;
  }

  public set location(location: string) {
    this._location = location;
  }

  public get relatedPrograms(): Program[] {
    return this._relatedPrograms;
  }

  public set relatedPrograms(relatedPrograms: Program[]) {
    this._relatedPrograms = relatedPrograms;
  }

  public get available(): boolean {
    return this._available;
  }

  public set available(available: boolean) {
    this._available = available;
  }

  public toJSON(): any {
    return {
      id: this._id,
      name: this._name,
      type: this._type,
      purchaseDate: this._purchaseDate,
      purchasePrice: this._purchasePrice,
      annualCost: this._annualCost,
      location: this._location,
      relatedPrograms: this._relatedPrograms,
      available: this._available
    };
  }

  public static fromJSON(researchDeviceJSON: any): ResearchDevice {
    return new ResearchDevice(
      researchDeviceJSON.id,
      researchDeviceJSON.name,
      researchDeviceJSON.type,
      new Date(researchDeviceJSON.purchaseDate),
      researchDeviceJSON.purchasePrice,
      researchDeviceJSON.annualCost,
      researchDeviceJSON.location,
      researchDeviceJSON.relatedPrograms,
      researchDeviceJSON.available
    );
  }
}
