import { Slider } from "@mui/material";
import * as React from "react";

type AgeRangeProps = {
  ageRange: number[];
  setAgeRange: React.Dispatch<React.SetStateAction<number[]>>;
};

export const AgeRangeFilter = ({ ageRange, setAgeRange }: AgeRangeProps) => {
  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 15,
      label: "15+",
    },
  ];

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setAgeRange(newValue as number[]);
  };
  return (
    <div className="w-full">
      <Slider
        max={15}
        getAriaLabel={() => "Age Range"}
        value={ageRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={(val) => {
          return `${val}`;
        }}
        marks={marks}
      />
    </div>
  );
};
