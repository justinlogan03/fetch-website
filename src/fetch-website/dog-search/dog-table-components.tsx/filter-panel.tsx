import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import * as React from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { PrimaryHeader } from "../../common-components/primary-header";

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
    <div className="w-2/6 bg-white rounded">
      <PrimaryHeader
        icon={<FilterListIcon fontSize="large" />}
        label={"Filters"}
      />
      <h3 className="p-4 font-bold bg-gray-100">Dog Breeds</h3>
      <div className="m-4 overflow-y-scroll" style={{ maxHeight: "50vh" }}>
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
