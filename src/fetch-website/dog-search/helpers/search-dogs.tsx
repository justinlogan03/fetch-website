import { DogsObject, getDogs } from "../apis/get-dogs";
import { DogSearchResults, getDogsSearch } from "../apis/get-dogs-search";
import { getPaginatedDogsSearch } from "../apis/get-paginated-dogs-search";

export const searchDogs = async (
  dogBreedFilters: string[],
  paginatedUrl?: string
) => {
  let dogIds: DogSearchResults = {
    resultIds: [],
    total: 0,
  };
  let dogsObject: DogsObject[] = [];
  const dogIdsRes = paginatedUrl
    ? await getPaginatedDogsSearch(paginatedUrl)
    : await getDogsSearch(dogBreedFilters);
  if (!dogIdsRes.isError) {
    dogIds = dogIdsRes.value;
    const dogsRes = await getDogs(dogIdsRes.value.resultIds);
    if (!dogsRes.isError) {
      dogsObject = dogsRes.value;
    }
  }
  return { dogIds, dogsObject };
};
