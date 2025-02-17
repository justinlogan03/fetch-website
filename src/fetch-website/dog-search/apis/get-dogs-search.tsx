import { ErrorResponse } from "../../types";

export type DogSearchResults = {
  resultIds: string[];
  total: number;
  next?: string;
  prv?: string;
};

export const getDogsSearch = async (): Promise<
  ErrorResponse<DogSearchResults>
> => {
  try {
    const dogsSearchRes = await fetch(
      "https://frontend-take-home-service.fetch.com/dogs/search",
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
