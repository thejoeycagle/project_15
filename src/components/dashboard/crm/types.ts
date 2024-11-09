export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  accountNumber: string;
  clientAccountNumber: string;
  originalCreditor: string;
  dateOpened: string;
  lastPaymentDate: string;
  lastPaymentAmount: number;
  accountStatus: string;
  accountBalance: number;
  ssn: string;
  dob: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumbers: PhoneNumber[];
  notes: Note[];
}

export interface PhoneNumber {
  id: string;
  number: string;
  status: 'good' | 'bad' | 'unknown';
}

export interface Note {
  id: string;
  text: string;
  createdBy: string;
  createdAt: string;
}