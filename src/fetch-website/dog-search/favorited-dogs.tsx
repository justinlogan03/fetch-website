import * as React from "react";
import { DogsObject } from "./apis/get-dogs";
import { ImageCell } from "./dog-table-components.tsx/image-cell";
import { HeartCell } from "./dog-table-components.tsx/heart-cell";
import { PrimaryButton } from "../common-components/buttons";
import { postDogsMatch } from "./apis/post-dogs-match";
import { useState } from "react";
import { PrimaryHeader } from "../common-components/primary-header";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { seperateFavorites } from "./helpers/favorited-dogs-helpers";
import { FavoritedDogsColumn } from "./dog-table-components.tsx/favorited-dogs-column";

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

  const { colOne, colTwo, colThree, colFour } =
    seperateFavorites(favoritedDogs);

  return (
    <div className="bg-white rounded w-full">
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
              <div className="mx-auto my-4">
                Select a dog to add to your favorites!
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
