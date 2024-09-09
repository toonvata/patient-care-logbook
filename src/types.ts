export interface Patient {
  hn: string;
  name: string;
  birthdate: string;
  occupation: string;
  address: string;
  phone: string;
  underlyingDisease: string;
  allergies: string;
}

export interface Treatment {
  patientHN: string;
  date: string;
  vitalSigns: {
    bloodPressure: string;
    pulse: number;
    temperature: number;
    respiratoryRate: number;
  };
  symptoms: string;
  diagnosis: string;
  treatment: string;
  medication: string;
  nextAppointment: string;
  bodyChart: string;
}