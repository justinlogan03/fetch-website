import * as React from "react";
import { DogsObject } from "./apis/get-dogs";

import { PrimaryButton } from "../common-components/buttons";
import { postDogsMatch } from "./apis/post-dogs-match";
import { useState } from "react";
import { PrimaryHeader } from "../common-components/primary-header";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { seperateFavorites } from "./helpers/favorited-dogs-helpers";
import { FavoritedDogsColumn } from "./dog-table-components.tsx/favorited-dogs-column";
import { MatchedDogMessage } from "./matched-dog-message";

type MyFavoritesSectionProps = {
  favoritedDogs: DogsObject[];
  setFavoritedDogs: React.Dispatch<React.SetStateAction<DogsObject[]>>;
  matchedDog: DogsObject | null;
  setMatchedDog: React.Dispatch<React.SetStateAction<DogsObject | null>>;
};

export const MyFavoritesSection = ({
  favoritedDogs,
  setFavoritedDogs,
  matchedDog,
  setMatchedDog,
}: MyFavoritesSectionProps) => {
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
      setMatchedDog(newMatchedDog ?? null);
      setFavoritedDogs([]);
    }
  };

  const { colOne, colTwo, colThree, colFour } =
    seperateFavorites(favoritedDogs);

  return (
    <div className="bg-white rounded w-full" style={{ minHeight: "256px" }}>
      <PrimaryHeader
        icon={<VolunteerActivismIcon fontSize="large" />}
        label={"My Favorites"}
        button={
          <PrimaryButton
            label="Match"
            onClick={onMatch}
            disabled={!hasFavorites}
          />
        }
      />

      {!!matchedDog ? (
        <MatchedDogMessage
          matchedDog={matchedDog}
          setMatchedDog={setMatchedDog}
        />
      ) : (
        <>
          {hasFavorites ? (
            <div className="flex overflow-x-hidden">
              <FavoritedDogsColumn
                dogColumn={colOne}
                favoritedDogs={favoritedDogs}
                setFavoritedDogs={setFavoritedDogs}
              />
              <FavoritedDogsColumn
                dogColumn={colTwo}
                favoritedDogs={favoritedDogs}
                setFavoritedDogs={setFavoritedDogs}
              />
              <FavoritedDogsColumn
                dogColumn={colThree}
                favoritedDogs={favoritedDogs}
                setFavoritedDogs={setFavoritedDogs}
              />
              <FavoritedDogsColumn
                dogColumn={colFour}
                favoritedDogs={favoritedDogs}
                setFavoritedDogs={setFavoritedDogs}
              />
            </div>
          ) : (
            <div className="flex">
              <div className="mx-auto mt-20 font-bold">
                Select a dog to add to your favorites!
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
