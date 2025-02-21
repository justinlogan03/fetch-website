import * as React from "react";
import { DogsObject } from "../apis/get-dogs";
import { HeartCell } from "./heart-cell";
import { ImageCell } from "./image-cell";

type FavoritedDogsColumnProps = {
  dogColumn: DogsObject[];
  favoritedDogs: DogsObject[];
  setFavoritedDogs: React.Dispatch<React.SetStateAction<DogsObject[]>>;
};

export const FavoritedDogsColumn = ({
  dogColumn,
  favoritedDogs,
  setFavoritedDogs,
}: FavoritedDogsColumnProps) => {
  return (
    <ul className="mx-16">
      {dogColumn.map((dog) => {
        return (
          <li className="flex my-2">
            <div className="my-auto mr-2">
              <HeartCell
                currentDog={dog}
                favoritedDogs={favoritedDogs}
                setFavoritedDogs={setFavoritedDogs}
              />
            </div>
            <div className="my-auto mr-4">
              <ImageCell alt={dog.name} imgUrl={dog.img} />
            </div>
            <span className=" my-auto">{dog.name}</span>
          </li>
        );
      })}
    </ul>
  );
};
