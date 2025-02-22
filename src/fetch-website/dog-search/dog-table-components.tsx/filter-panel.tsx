import { Checkbox, FormControlLabel, FormGroup, Slider } from "@mui/material";
import * as React from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { PrimaryHeader } from "../../common-components/primary-header";
import { useState } from "react";
import { AgeRangeFilter } from "./age-range-filter";

type FilterPanelProps = {
  dogBreedList: string[];
  dogBreedFilters: string[];
  setDogBreedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  ageRange: number[];
  setAgeRange: React.Dispatch<React.SetStateAction<number[]>>;
};

export const FilterPanel = ({
  dogBreedList,
  dogBreedFilters,
  setDogBreedFilters,
  ageRange,
  setAgeRange,
}: FilterPanelProps) => {
  return (
    <div className="w-2/6 bg-white rounded" style={{ maxHeight: "100vh" }}>
      <PrimaryHeader
        icon={<FilterListIcon fontSize="large" />}
        label={"Filters"}
      />
      <h3 className="p-4 font-bold bg-gray-100 border">Age Range</h3>
      <div className="my-4 mx-12">
        <AgeRangeFilter ageRange={ageRange} setAgeRange={setAgeRange} />
      </div>
      <h3 className="p-4 font-bold bg-gray-100 border">Dog Breeds</h3>
      <div className="m-4 overflow-y-scroll" style={{ maxHeight: "75vh" }}>
        <FormGroup className="ml-4">
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
