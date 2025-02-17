import React, { useEffect, useState } from "react";
import { SearchBar } from "./search-bar";
import { DogBreeds, getDogsBreeds } from "./apis/get-dogs-breeds";
import { Table } from "@mui/material";
import { getDogsSearch } from "./apis/get-dogs-search";
import { searchDogs } from "./helpers/search-dogs";
import { DogsObject } from "./apis/get-dogs";
import DogTable from "./dog-table";

export const DogSearch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDogsResults, setCurrentDogsResults] = useState<DogsObject[]>(
    []
  );

  useEffect(() => {
    setIsLoading(true);
    searchDogs()
      .then((res) => {
        setCurrentDogsResults(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="grid">
      <div className="mx-auto p-24">
        <SearchBar />
      </div>
      <div className="mx-auto">
        {!isLoading && <DogTable rows={currentDogsResults} />}
      </div>
    </div>
  );
};
