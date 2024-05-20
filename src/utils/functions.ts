export const capitalize = (inputString: string): string => {
  const words: string[] = inputString.split(" ");

  const capitalizedWords: string[] = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
};
