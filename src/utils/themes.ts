export const getRandomColor = (colors: string[]) => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getDeterministicColor = (str: string, colors: string[]) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  const index = Math.abs(hash) % colors.length;

  return colors[index];
};
