import React, { useEffect, useState } from "react";

import { searchDogs } from "./helpers/search-dogs";
import { DogsObject } from "./apis/get-dogs";
import { DogTable } from "./dog-table";
import { getDogsBreeds } from "./apis/get-dogs-breeds";
import { FilterPanel } from "./dog-table-components.tsx/filter-panel";
import { DogSearchResults } from "./apis/get-dogs-search";
import { MyFavoritesSection } from "./favorited-dogs";

import { LogoutButton } from "./logout-button";
import { Order } from "../types";

type DogsSearchProps = {
  setIsLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DogSearch = ({ setIsLoginSuccess }: DogsSearchProps) => {
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
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof DogsObject>("breed");
  const [matchedDog, setMatchedDog] = useState<DogsObject | null>(null);
  const [ageRange, setAgeRange] = useState<number[]>([0, 15]);

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
    searchDogs({ dogBreedFilters, order, orderBy, ageRange }).then((res) => {
      setDogIdsObject(res.dogIds);
      setCurrentDogsResults(res.dogsObject);
    });
  }, [dogBreedFilters, order, orderBy, ageRange]);

  return (
    <div className="">
      <div className="flex">
        <LogoutButton setIsLoginSuccess={setIsLoginSuccess} />
      </div>
      <div className="flex px-24 pt-8">
        <MyFavoritesSection
          favoritedDogs={favoritedDogs}
          setFavoritedDogs={setFavoritedDogs}
          matchedDog={matchedDog}
          setMatchedDog={setMatchedDog}
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
              order={order}
              setOrder={setOrder}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              matchedDog={matchedDog}
            />
            <FilterPanel
              dogBreedList={dogBreedList}
              dogBreedFilters={dogBreedFilters}
              setDogBreedFilters={setDogBreedFilters}
              ageRange={ageRange}
              setAgeRange={setAgeRange}
            />
          </>
        )}
      </div>
    </div>
  );
};
