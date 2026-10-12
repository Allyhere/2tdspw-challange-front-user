import { RadioButton, RadioField, RadioGroup } from "react-aria-components";
import type { PetChooserProps } from "@/components/PetChooser/PetChooser.types";

const radioClass =
  "cursor-pointer rounded-md border border-border-divider bg-surface-base px-lg py-sm font-inter text-body text-text-primary outline-none data-selected:border-primary data-selected:bg-primary-light data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-dark";

export function PetChooser({ pets, selectedPetId, onSelectPet }: PetChooserProps) {
  return (
    <RadioGroup
      aria-label="Pets"
      value={selectedPetId}
      onChange={onSelectPet}
      className="flex flex-wrap justify-center gap-sm"
    >
      {pets.map((pet) => (
        <RadioField key={pet.id} value={pet.id}>
          <RadioButton className={radioClass}>{pet.name}</RadioButton>
        </RadioField>
      ))}
    </RadioGroup>
  );
}
