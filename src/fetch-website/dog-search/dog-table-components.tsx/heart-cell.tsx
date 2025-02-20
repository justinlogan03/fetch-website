import * as React from "react";
import { DogsObject } from "../apis/get-dogs";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

type HeartCellProps = {
  currentDog: DogsObject;
  favoritedDogs: DogsObject[];
  setFavoritedDogs: React.Dispatch<React.SetStateAction<DogsObject[]>>;
};

export const HeartCell = ({
  currentDog,
  favoritedDogs,
  setFavoritedDogs,
}: HeartCellProps) => {
  const isFavorited = favoritedDogs.find((dog) => {
    return dog.id === currentDog.id;
  });
  return (
    <button
      className="p-2 m-2 hover:bg-blue-100 rounded-full"
      onClick={() => {
        if (isFavorited) {
          // remove dog from favorites
          const updatedFavs = favoritedDogs.filter((dog) => {
            return dog.id !== currentDog.id;
          });
          setFavoritedDogs(updatedFavs);
        } else {
          // add dog to favorites
          const updatedFavs = favoritedDogs.concat([currentDog]);
          setFavoritedDogs(updatedFavs);
        }
      }}
    >
      {isFavorited ? (
        <FavoriteIcon className="text-red-500" />
      ) : (
        <FavoriteBorderIcon />
      )}
    </button>
  );
};
