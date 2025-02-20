import { ErrorResponse } from "../../types";

// TODO - allow props to maximize search

export type DogSearchResults = {
  resultIds: string[];
  total: number;
  next?: string;
  prv?: string;
};

export const getDogsSearch = async (
  dogBreedFilters: string[]
): Promise<ErrorResponse<DogSearchResults>> => {
  let url = `https://frontend-take-home-service.fetch.com/dogs/search/`;
  if (dogBreedFilters.length > 0) {
    url = `${url}?breeds[]=${dogBreedFilters.join("&breeds[]=")}`;
  }
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
    console.log(error);
    return { isError: true, error };
  }
};
