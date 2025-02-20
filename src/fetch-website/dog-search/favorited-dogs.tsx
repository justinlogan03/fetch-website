import * as React from "react";
import { DogsObject } from "./apis/get-dogs";
import { ImageCell } from "./dog-table-components.tsx/image-cell";
import { HeartCell } from "./dog-table-components.tsx/heart-cell";

type MyFavoritesSectionProps = {
  favoritedDogs: DogsObject[];
  setFavoritedDogs: React.Dispatch<React.SetStateAction<DogsObject[]>>;
};

export const MyFavoritesSection = ({
  favoritedDogs,
  setFavoritedDogs,
}: MyFavoritesSectionProps) => {
  return (
    <div className="bg-white rounded w-full">
      <h1 className="m-4 text-xl">My Favorites</h1>
      {favoritedDogs.length > 0 ? (
        <ul className="my-12 mx-16">
          {favoritedDogs.map((dog) => {
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
      ) : (
        <div className="flex">
          <div className="mx-auto my-4">No Favorites</div>
        </div>
      )}
    </div>
  );
};
