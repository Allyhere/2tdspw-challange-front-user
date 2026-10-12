export type TutorPet = {
  id: string;
  name: string;
  breed: string;
  sex: "M" | "F";
  weight: number;
  age: number;
  isCastrated: boolean;
  species: string;
};

export type AuthUser = {
  phoneNumber: string;
  uid: string;
  name: string;
  email: string;
  document: string;
  pets: TutorPet[];
};
