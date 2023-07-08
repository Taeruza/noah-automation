import { faker } from '@faker-js/faker';

export const generateApplicantInfo = (): Applicant => {
  const person: Applicant = {
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number('+48 91 ### ## ##'),
    currentCompany: faker.company.name(),
  };
  return person;
};

export type Applicant = {
  fullName: string;
  email: string;
  phone?: string;
  currentCompany?: string;
};
