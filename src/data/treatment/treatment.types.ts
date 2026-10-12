export type TreatmentAppointment = {
  id: string;
  appointmentName: string;
  appointmentPrice: number | null;
  appointmentDate: string;
};

export type Pet = {
  name: string;
  breed: string;
  isCastrated: boolean;
  weightKg: number;
  ageYears: number;
};

export type TreatmentPlanData = {
  summary: string;
  items: TreatmentAppointment[];
};
