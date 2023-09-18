import {UserRole} from '@shared/enums/user/user-role.enum';
import {User} from './user';
import {Faculty} from '@shared/enums/faculty-and-department/faculty.enum';
import {LawProgram} from '@shared/enums/faculty-and-department/law-program.enum';

export class StubUser {
  public static getRandomUser(): User {
    return this.getRandomUserWithId(1);
  }
  public static getRandomUserWithId(id: number): User {
    const firstName = FIRST_NAMES[Math.round(Math.random() * (FIRST_NAMES.length - 1))];
    const lastName = LAST_NAMES[Math.round(Math.random() * (LAST_NAMES.length - 1))];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@mail.com`;

    return new User(
      `${id}`,
      firstName,
      lastName,
      email,
      `${Math.floor(Math.random() * 90000) + 10000}`,
      getRandomEnumValue(UserRole),
      getRandomDateWithinOneMonthRange(),
      `${Math.floor(100000000 + Math.random() * 900000000)}`,
      Faculty.LAW,
      LawProgram.LAWS,
      2024
    );
  }

  public static createAmountOfUsers(amount: number): User[] {
    const users: User[] = [];

    for (let i = 0; i < amount; i++) {
      users.push(this.getRandomUserWithId(i));
    }

    return users;
  }
}

function getRandomDateWithinOneMonthRange(): Date {
  const currentDate = new Date();

  const minDate = new Date(currentDate);
  minDate.setMonth(currentDate.getMonth() - 1);

  const maxDate = new Date(currentDate);
  maxDate.setMonth(currentDate.getMonth() + 1);

  const randomTimestamp = minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime());
  const randomDate = new Date(randomTimestamp);

  return randomDate;
}

function getRandomEnumValue<T>(enumObj: T): T[keyof T] {
  const enumValues = Object.values(enumObj);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

const FIRST_NAMES = [
  'Aldersley',
  'Beden',
  'Baudinelli',
  'Erik',
  'Burgwin',
  'Fasler',
  'Echalier',
  'Grayshon',
  'Marder',
  'Ingon',
  'Cossins',
  'Burgen',
  'Astbury',
  'Redgrave',
  'Gallamore',
  'Carvil',
  'Puttan',
  'Goodfellowe',
  'Bigham',
  'Jenman',
  'Merrell',
  'Lucy',
  'MacFarland',
  'Axcel',
  'Tubritt',
  'Coo',
  'Lumber',
  'Aveling',
  'Relfe',
  'Rodman'
];

const LAST_NAMES = [
  'Aldersley',
  'Beden',
  'Baudinelli',
  'Erik',
  'Burgwin',
  'Fasler',
  'Echalier',
  'Grayshon',
  'Marder',
  'Ingon',
  'Cossins',
  'Burgen',
  'Astbury',
  'Redgrave',
  'Gallamore',
  'Carvil',
  'Puttan',
  'Goodfellowe',
  'Bigham',
  'Jenman',
  'Merrell',
  'Lucy',
  'MacFarland',
  'Axcel',
  'Tubritt',
  'Coo',
  'Lumber',
  'Aveling',
  'Relfe',
  'Rodman'
];
