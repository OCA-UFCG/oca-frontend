"use client";

import {
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Entry, EntrySkeletonType, createClient } from "contentful";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { ArticleImage } from "@/app/globalStyles";
import { IEEInfo } from "@/utils/interfaces";

export const client = createClient({
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? "",
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE ?? "",
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
  mapsData: { fields: IEEInfo }[];
  setMapsData: (value: SetStateAction<{ fields: IEEInfo }[]>) => void;
  loadData: (
    contentType: string,
    setFunction?: (e: any) => void | any,
  ) => Promise<Entry<EntrySkeletonType, undefined, string>[]>;
}

export const CMSContext = createContext<ICMSContent>({
  loading: false,
  setLoading: () => {},
  loadData: (e: any) => e,
  mapsData: [],
  setMapsData: (e: any) => e,
});

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [mapsData, setMapsData] = useState<{ fields: IEEInfo }[]>([]);

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

  useEffect(() => {
    loadData("tiffInfo", setMapsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = { mapsData, setMapsData, loading, setLoading, loadData };

  return <CMSContext.Provider value={values}>{children}</CMSContext.Provider>;
};
