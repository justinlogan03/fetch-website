import { ErrorResponse } from "../../types";
import { DogSearchResults } from "./get-dogs-search";

export const getPaginatedDogsSearch = async (
  url: string // next or previous url
): Promise<ErrorResponse<DogSearchResults>> => {
  try {
    const dogsSearchRes = await fetch(
      `https://frontend-take-home-service.fetch.com${url}`,
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const dogSearch = await dogsSearchRes.json();
    return {
      isError: false,
      value: dogSearch,
    };
  } catch (error) {
    return { isError: true, error };
  }
};
