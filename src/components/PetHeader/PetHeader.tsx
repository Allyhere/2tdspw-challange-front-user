import type { PetHeaderProps } from "@/components/PetHeader/PetHeader.types";
import { formatPetDetails } from "@/lib/format/format";

export function PetHeader({ pet }: PetHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-xs text-center">
      <h2 className="font-inter text-heading-1 text-balance text-text-primary">
        {pet.name} ({pet.breed})
      </h2>
      <p className="font-inter text-subtitle text-text-primary">
        {formatPetDetails(pet)}
      </p>
    </header>
  );
}
