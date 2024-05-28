export const capitalize = (inputString: string): string => {
  const words: string[] = inputString.split(" ");

  const capitalizedWords: string[] = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
};

export const formatPalette = (
  originalPallete: string[],
  colorNumbers: number[],
): string[] => {
  const pallete: string[] = [];

  for (let i = 0; i < originalPallete.length; i++) {
    for (let j = 0; j < colorNumbers[i]; j++) {
      pallete.push(originalPallete[i]);
    }
  }

  return pallete;
};
