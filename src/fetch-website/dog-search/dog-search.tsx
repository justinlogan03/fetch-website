import React, { useEffect, useState } from "react";

import { searchDogs } from "./helpers/search-dogs";
import { DogsObject } from "./apis/get-dogs";
import { DogTable } from "./dog-table";
import { getDogsBreeds } from "./apis/get-dogs-breeds";
import { FilterPanel } from "./dog-table-components.tsx/filter-panel";
import { DogSearchResults } from "./apis/get-dogs-search";
import { ImageCell } from "./dog-table-components.tsx/image-cell";
import { MyFavoritesSection } from "./favorited-dogs";

export const DogSearch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // TODO - build out better loading state
  const [dogIdsObject, setDogIdsObject] = useState<DogSearchResults>({
    resultIds: [],
    total: 0,
  });
  const [currentDogsResults, setCurrentDogsResults] = useState<DogsObject[]>(
    []
  );
  const [dogBreedList, setDogBreedList] = useState<string[] | null>(null);
  const [dogBreedFilters, setDogBreedFilters] = useState<string[]>([]);
  const [favoritedDogs, setFavoritedDogs] = useState<DogsObject[]>([]);

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
        setDogIdsObject(res.dogIds);
        setCurrentDogsResults(res.dogsObject);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dogBreedFilters]);

  return (
    <div className="">
      <div className="flex px-24 pt-12">
        <MyFavoritesSection
          favoritedDogs={favoritedDogs}
          setFavoritedDogs={setFavoritedDogs}
        />
      </div>
      <div className="mx-auto px-24 pt-4 pb-12 flex gap-4">
        {dogBreedList !== null && (
          <>
            <DogTable
              rows={currentDogsResults}
              dogIdsObject={dogIdsObject}
              setDogIdsObject={setDogIdsObject}
              favoritedDogs={favoritedDogs}
              setFavoritedDogs={setFavoritedDogs}
              setCurrentDogsResults={setCurrentDogsResults}
              isLoading={isLoading}
            />
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
