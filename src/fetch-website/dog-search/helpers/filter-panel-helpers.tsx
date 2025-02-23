export const getAgeRangePillLabel = (ageRange: number[]) => {
  const ageMin = ageRange?.[0] ?? null;
  const ageMax = ageRange?.[1] ?? null;

  if (ageMin !== null && ageMax !== null) {
    const maxLabel = ageMax >= 15 ? "15+" : `${ageMax}`;
    return `${ageMin} - ${maxLabel}`;
  }
  return undefined;
};

export const getDogBreedsPillLabel = (dogBreedFilters: string[]) => {
  const count = dogBreedFilters.length;
  if (count > 0) {
    return `+${count}`;
  }
  return undefined;
};
