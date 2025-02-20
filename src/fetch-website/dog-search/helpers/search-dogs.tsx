import { DogsObject, getDogs } from "../apis/get-dogs";
import { getDogsSearch } from "../apis/get-dogs-search";

export const searchDogs = async (dogBreedFilters: string[]) => {
  let dogs: DogsObject[] = [];
  const dogIds = await getDogsSearch(dogBreedFilters);
  if (!dogIds.isError) {
    const dogsRes = await getDogs(dogIds.value.resultIds);
    if (!dogsRes.isError) {
      dogs = dogsRes.value;
    }
  }
  return dogs;
};
