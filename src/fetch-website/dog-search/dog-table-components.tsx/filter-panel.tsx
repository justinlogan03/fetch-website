import { Checkbox, FormControlLabel, FormGroup, Slider } from "@mui/material";
import * as React from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { PrimaryHeader } from "../../common-components/primary-header";
import { AgeRangeFilter } from "./age-range-filter";
import { SecondaryHeader } from "../../common-components/secondary-header";
import { ExpandButton } from "../../common-components/expand-button";
import { useState } from "react";
import {
  getAgeRangePillLabel,
  getDogBreedsPillLabel,
} from "../helpers/filter-panel-helpers";

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
  const [isAgeRangeOpen, setIsAgeRangeOpen] = useState<boolean>(false);
  const [isDogBreedsOpen, setIsDogBreedsOpen] = useState<boolean>(false);

  return (
    <div className="w-2/6 bg-white rounded" style={{ maxHeight: "120vh" }}>
      <PrimaryHeader
        icon={<FilterListIcon fontSize="large" />}
        label={"Filters"}
      />
      {/** - - - - - - - - - Age Range Filter - - - - - - - - - */}
      <SecondaryHeader
        label="Age Range"
        pillLabel={getAgeRangePillLabel(ageRange)}
        button={
          <ExpandButton isOpen={isAgeRangeOpen} setIsOpen={setIsAgeRangeOpen} />
        }
      />
      {isAgeRangeOpen && (
        <div className="my-4 mx-12">
          <AgeRangeFilter ageRange={ageRange} setAgeRange={setAgeRange} />
        </div>
      )}

      {/** - - - - - - - - - Dog Breed Filter - - - - - - - - - */}
      <SecondaryHeader
        label="Dog Breeds"
        pillLabel={getDogBreedsPillLabel(dogBreedFilters)}
        button={
          <ExpandButton
            isOpen={isDogBreedsOpen}
            setIsOpen={setIsDogBreedsOpen}
          />
        }
      />
      {isDogBreedsOpen && (
        <div className="m-4 overflow-y-scroll" style={{ maxHeight: "60vh" }}>
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
                          const updatedFilters = dogBreedFilters.concat([
                            breed,
                          ]);
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
      )}
    </div>
  );
};
