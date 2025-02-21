import { DogsObject } from "../apis/get-dogs";

export const seperateFavorites = (favoritedDogs: DogsObject[]) => {
  let colOne: DogsObject[] = [];
  let colTwo: DogsObject[] = [];
  let colThree: DogsObject[] = [];
  let colFour: DogsObject[] = [];

  let tempColOne: DogsObject[] = [];
  let tempColTwo: DogsObject[] = [];

  favoritedDogs.forEach((dog, index) => {
    if (index % 2) {
      tempColTwo.push(dog);
    } else {
      tempColOne.push(dog);
    }
  });

  tempColOne.forEach((dog, index) => {
    if (index % 2) {
      colThree.push(dog);
    } else {
      colOne.push(dog);
    }
  });

  tempColTwo.forEach((dog, index) => {
    if (index % 2) {
      colFour.push(dog);
    } else {
      colTwo.push(dog);
    }
  });

  return { colOne, colTwo, colThree, colFour };
};
