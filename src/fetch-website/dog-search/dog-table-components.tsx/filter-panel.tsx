import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import * as React from "react";

type FilterPanelProps = {
  dogBreedList: string[];
  dogBreedFilters: string[];
  setDogBreedFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FilterPanel = ({
  dogBreedList,
  dogBreedFilters,
  setDogBreedFilters,
}: FilterPanelProps) => {
  return (
    <div className=" w-2/6 bg-white  rounded">
      <h1 className="m-4 text-xl">Filters</h1>
      <h3 className="m-4">Dog Breeds</h3>
      <div className="m-4">
        <FormGroup>
          {dogBreedList.map((breed) => {
            return (
              <FormControlLabel
                key={breed}
                control={
                  <Checkbox
                    checked={dogBreedFilters.includes(breed)}
                    onChange={() => {
                      if (dogBreedFilters.includes(breed)) {
                        const updatedFilters = dogBreedFilters.filter(
                          (curr) => {
                            return curr !== breed;
                          }
                        );
                        setDogBreedFilters(updatedFilters);
                      } else {
                        const updatedFilters = dogBreedFilters.concat([breed]);
                        setDogBreedFilters(updatedFilters);
                      }
                    }}
                  />
                }
                label={breed}
              />
            );
          })}
        </FormGroup>
      </div>
    </div>
  );
};
