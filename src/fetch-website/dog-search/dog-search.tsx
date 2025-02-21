import React, { useEffect, useState } from "react";

import { searchDogs } from "./helpers/search-dogs";
import { DogsObject } from "./apis/get-dogs";
import { DogTable } from "./dog-table";
import { getDogsBreeds } from "./apis/get-dogs-breeds";
import { FilterPanel } from "./dog-table-components.tsx/filter-panel";
import { DogSearchResults } from "./apis/get-dogs-search";
import { MyFavoritesSection } from "./favorited-dogs";
import { postAuthLogout } from "../login-page/apis/post-auth-logout";

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
    searchDogs(dogBreedFilters).then((res) => {
      setDogIdsObject(res.dogIds);
      setCurrentDogsResults(res.dogsObject);
    });
  }, [dogBreedFilters]);

  const onLogout = async () => {
    const authLogout = await postAuthLogout();
    if (authLogout.isSuccess) {
      setIsLoginSuccess(false);
    }
  };

  return (
    <div className="">
      <div className="flex">
        <button
          className="ml-auto mr-8 mt-2 hover:underline"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
      <div className="flex px-24 pt-8">
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
