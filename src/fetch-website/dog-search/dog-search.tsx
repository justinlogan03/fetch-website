import React, { useEffect, useState } from "react";

import { searchDogs } from "./helpers/search-dogs";
import { DogsObject } from "./apis/get-dogs";
import DogTable from "./dog-table";
import { getDogsBreeds } from "./apis/get-dogs-breeds";
import { FilterPanel } from "./dog-table-components.tsx/filter-panel";

export const DogSearch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // TODO - build out better loading state
  const [currentDogsResults, setCurrentDogsResults] = useState<DogsObject[]>(
    []
  );
  const [dogBreedList, setDogBreedList] = useState<string[] | null>(null);
  const [dogBreedFilters, setDogBreedFilters] = useState<string[]>([]);

  useEffect(() => {
    //fetch dog breed list on initial load
    if (dogBreedList === null) {
      getDogsBreeds().then((res) => {
        if (!res.isError) {
          setDogBreedList(res.value);
        }
      });
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    searchDogs(dogBreedFilters)
      .then((res) => {
        setCurrentDogsResults(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dogBreedFilters]);

  return (
    <div className="">
      <div className="mx-auto p-24 flex gap-4">
        {!isLoading && dogBreedList !== null && (
          <>
            <DogTable rows={currentDogsResults} />
            <FilterPanel
              dogBreedList={dogBreedList}
              dogBreedFilters={dogBreedFilters}
              setDogBreedFilters={setDogBreedFilters}
            />
          </>
        )}
      </div>
    </div>
  );
};
