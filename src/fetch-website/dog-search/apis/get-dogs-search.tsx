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
  order?: Order,
  orderBy?: keyof DogsObject
): Promise<ErrorResponse<DogSearchResults>> => {
  let url = `https://frontend-take-home-service.fetch.com/dogs/search/`;
  if (dogBreedFilters.length > 0) {
    url = `${url}?breeds[]=${dogBreedFilters.join("&breeds[]=")}`;
  }
  if (order && orderBy) {
    url = `${url}?sort=${orderBy}:${order}`;
  }
  try {
    const dogsSearchRes = await fetch(url, {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const dogSearch = await dogsSearchRes.json();
    return {
      isError: false,
      value: dogSearch,
    };
  } catch (error) {
    return { isError: true, error };
  }
};
