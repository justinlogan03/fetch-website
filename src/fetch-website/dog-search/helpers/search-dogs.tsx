import { Order } from "../../types";
import { DogsObject, getDogs } from "../apis/get-dogs";
import { DogSearchResults, getDogsSearch } from "../apis/get-dogs-search";
import { getPaginatedDogsSearch } from "../apis/get-paginated-dogs-search";

type searchDogsProps = {
  dogBreedFilters: string[];
  ageRange?: number[];
  order?: Order;
  orderBy?: keyof DogsObject;
  paginatedUrl?: string;
};

export const searchDogs = async ({
  dogBreedFilters,
  ageRange = [0, 15],
  order,
  orderBy,
  paginatedUrl,
}: searchDogsProps) => {
  let dogIds: DogSearchResults = {
    resultIds: [],
    total: 0,
  };
  let dogsObject: DogsObject[] = [];
  const dogIdsRes = paginatedUrl
    ? await getPaginatedDogsSearch(paginatedUrl)
    : await getDogsSearch(dogBreedFilters, ageRange, order, orderBy);
  if (!dogIdsRes.isError) {
    dogIds = dogIdsRes.value;
    const dogsRes = await getDogs(dogIdsRes.value.resultIds);
    if (!dogsRes.isError) {
      dogsObject = dogsRes.value;
    }
  }
  return { dogIds, dogsObject };
};
