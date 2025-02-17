import { ErrorResponse } from "../../types";

export type DogsObject = {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zipCode: string;
};

export const getDogs = async (
  dogIds: string[]
): Promise<ErrorResponse<DogsObject[]>> => {
  const body = JSON.stringify(dogIds);
  try {
    const dogsRes = await fetch(
      "https://frontend-take-home-service.fetch.com/dogs",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      }
    );
    const dogs = await dogsRes.json();
    return {
      isError: false,
      value: dogs,
    };
  } catch (error) {
    return { isError: true, error };
  }
};
