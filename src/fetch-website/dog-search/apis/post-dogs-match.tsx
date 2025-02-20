import { ErrorResponse } from "../../types";

type DogsMatchResponse = {
  match: string;
};

export const postDogsMatch = async (
  dogIds: string[]
): Promise<ErrorResponse<DogsMatchResponse>> => {
  const body = JSON.stringify(dogIds);
  try {
    const matchRes = await fetch(
      "https://frontend-take-home-service.fetch.com/dogs/match",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      }
    );
    const match = await matchRes.json();
    return {
      isError: false,
      value: match,
    };
  } catch (error) {
    return { isError: true, error };
  }
};
