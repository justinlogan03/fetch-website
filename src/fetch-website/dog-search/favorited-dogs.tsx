import * as React from "react";
import { DogsObject } from "./apis/get-dogs";
import { ImageCell } from "./dog-table-components.tsx/image-cell";
import { HeartCell } from "./dog-table-components.tsx/heart-cell";
import { PrimaryButton } from "../common-components/buttons";
import { postDogsMatch } from "./apis/post-dogs-match";
import { useState } from "react";

type MyFavoritesSectionProps = {
  favoritedDogs: DogsObject[];
  setFavoritedDogs: React.Dispatch<React.SetStateAction<DogsObject[]>>;
};

export const MyFavoritesSection = ({
  favoritedDogs,
  setFavoritedDogs,
}: MyFavoritesSectionProps) => {
  const [matchedDog, setMatchDog] = useState<DogsObject | null>(null);
  const hasFavorites = favoritedDogs.length > 0;

  const onMatch = async () => {
    const idList = favoritedDogs.map((dog) => {
      return dog.id;
    });
    const matchRes = await postDogsMatch(idList);
    if (!matchRes.isError) {
      const newMatchedDog = favoritedDogs.find((dog) => {
        return dog.id === matchRes.value.match;
      });
      setMatchDog(newMatchedDog ?? null);
      setFavoritedDogs([]);
    }
  };

  return (
    <div className="bg-white rounded w-full">
      <div className="flex w-full">
        <h1 className="m-4 text-xl">My Favorites</h1>
        <div className="my-auto ml-auto mr-4">
          <PrimaryButton
            label="Match"
            onClick={onMatch}
            disabled={!hasFavorites}
          />
        </div>
      </div>
      {!!matchedDog ? (
        <div className="flex my-2">
          <div className="mx-auto flex">
            <div className="my-auto mr-4">
              <ImageCell alt={matchedDog.name} imgUrl={matchedDog.img} />
            </div>
            <span className=" my-auto">{matchedDog.name}</span>
          </div>
        </div>
      ) : (
        <>
          {hasFavorites ? (
            <div className="flex">
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
            </div>
          ) : (
            <div className="flex">
              <div className="mx-auto my-4">No Favorites</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
