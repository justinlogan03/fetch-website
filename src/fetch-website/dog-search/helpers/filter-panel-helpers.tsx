export const getAgeRangePillLabel = (ageRange: number[]) => {
  const ageMin = ageRange?.[0] ?? null;
  const ageMax = ageRange?.[1] ?? null;
  console.log(ageRange);

  if (ageMin !== null && ageMax !== null) {
    return `${ageMin} - ${ageMax}`;
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
