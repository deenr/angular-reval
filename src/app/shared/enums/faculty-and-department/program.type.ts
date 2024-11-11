import { ArchitectureAndArtsProgram } from './architecture-and-arts-program.enum';
import { BusinessProgram } from './business-program.enum';
import { EngineeringTechnologyProgram } from './engineering-technology-program.enum';
import { LawProgram } from './law-program.enum';
import { MedicineAndLifeProgram } from './medicine-and-life-program.enum';
import { RehabilitationSciencesProgram } from './rehabilitation-sciences-program.enum';
import { SciencesProgram } from './sciences-program.enum';
import { SocialSciencesProgram } from './social-sciences-program.enum';
import { TransportationSciencesProgram } from './transportation-sciences-program.enum';

export type Program =
  | ArchitectureAndArtsProgram
  | BusinessProgram
  | EngineeringTechnologyProgram
  | LawProgram
  | MedicineAndLifeProgram
  | RehabilitationSciencesProgram
  | SciencesProgram
  | SocialSciencesProgram
  | TransportationSciencesProgram;
