export const getRandomCollectionItem = <T>(collection: T[]) =>
  collection[Math.floor(Math.random() * collection.length)];

export const getRandomCollectionItems = <T>(collection: T[], length: number) =>
  collection.sort(() => 0.5 - Math.random()).slice(0, length);
