import { ErrorResponse, Order } from "../../types";
import { DogsObject } from "./get-dogs";

export type DogSearchResults = {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
};

export const getDogsSearch = async (
  dogBreedFilters: string[],
  ageRange: number[],
  order?: Order,
  orderBy?: keyof DogsObject
): Promise<ErrorResponse<DogSearchResults>> => {
  const hasOrder = order && orderBy;
  const hasBreedFilter = dogBreedFilters.length > 0;
  const ageMin = ageRange?.[0] ?? 0;
  const ageMax = ageRange?.[1] ?? 15;

  let url = `https://frontend-take-home-service.fetch.com/dogs/search/?ageMin=${ageMin}`;
  if (ageMax < 15) {
    url = `${url}&ageMax=${ageMax}`;
  }
  if (hasBreedFilter) {
    url = `${url}&breeds[]=${dogBreedFilters.join("&breeds[]=")}`;
  }
  if (hasOrder) {
    url = `${url}&sort=${orderBy}:${order}`;
  }
  console.log(url);
  try {
    const dogsSearchRes = await fetch(url, {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const dogSearch = await dogsSearchRes.json();
    console.log(dogSearch);
    return {
      isError: false,
      value: dogSearch,
    };
  } catch (error) {
    return { isError: true, error };
  }
};
