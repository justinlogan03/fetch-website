import * as React from "react";
import { ImageCell } from "./dog-table-components.tsx/image-cell";
import { DogsObject } from "./apis/get-dogs";
import { SecondaryButton } from "../common-components/buttons";

type MatchedDogProps = {
  matchedDog: DogsObject;
  setMatchedDog: React.Dispatch<React.SetStateAction<DogsObject | null>>;
};

export const MatchedDogMessage = ({
  matchedDog,
  setMatchedDog,
}: MatchedDogProps) => {
  const onReset = () => {
    setMatchedDog(null);
  };

  return (
    <div className="flex">
      <div className="mx-auto my-4">
        <h1 className="font-bold text-xl">{"Congrats on your Match!!!"}</h1>
        <div className="flex">
          <div className="mx-auto mt-4">
            <ImageCell
              alt={matchedDog.name}
              imgUrl={matchedDog.img}
              size={128}
            />
          </div>
        </div>
        <div className="flex ">
          <div className="mt-4 mx-auto">
            <SecondaryButton label="Reset Match" onClick={onReset} />
          </div>
        </div>
      </div>
    </div>
  );
};
