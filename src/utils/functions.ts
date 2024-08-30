import { createClient } from "contentful";

export const getContent = async (contentTypes: string[]) => {
  const client = createClient({
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE || "",
  });
  const content: any = {};

  for (const type of contentTypes) {
    const res = await client.getEntries({ content_type: type });
    content[type] = res.items;
  }

  return content;
};

export const capitalize = (inputString: string): string => {
  const words: string[] = inputString.split(" ");

  const capitalizedWords: string[] = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
};
