import { ErrorResponse } from "../../types";

export type DogBreeds = string[];

export const getDogsBreeds = async (): Promise<ErrorResponse<DogBreeds>> => {
  try {
    const dogsBreedsRes = await fetch(
      "https://frontend-take-home-service.fetch.com/dogs/breeds",
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const dogList = await dogsBreedsRes.json();
    return {
      isError: false,
      value: dogList,
    };
  } catch (error) {
    return { isError: true, error };
  }
};
