"use client";

import {
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useState,
} from "react";
import { Entry, EntrySkeletonType, createClient } from "contentful";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { ArticleImage } from "@/app/globalStyles";

export const client = createClient({
  accessToken: "xbQbXUCTLdAnjxm2hktaKaVSTDi9v5YhJKZd1LmkLZE",
  space: "49yodhe2mply",
});

export const renderOptions: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <ArticleImage
          alt=""
          width={node.data.target.fields.file.details.image.width}
          height={node.data.target.fields.file.details.image.height}
          src={`https:${node.data.target.fields.file.url}`}
        />
      );
    },
  },
};

interface ICMSContent {
  loading: boolean;
  setLoading: (value: SetStateAction<boolean>) => void;
  loadData: (
    contentType: string,
    setFunction?: (e: any) => void | any,
  ) => Promise<Entry<EntrySkeletonType, undefined, string>[]>;
}

export const CMSContext = createContext<ICMSContent>({
  loading: false,
  setLoading: () => {},
  loadData: (e: any) => e,
});

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
    async (contentType: string, setFunction?: Function) => {
      setLoading(true);
      const res = await client.getEntries({ content_type: contentType });
      if (setFunction) {
        setFunction(res.items);
      }
      setLoading(false);

      return res.items;
    },
    [],
  );

  const values = { loading, setLoading, loadData };

  return <CMSContext.Provider value={values}>{children}</CMSContext.Provider>;
};
