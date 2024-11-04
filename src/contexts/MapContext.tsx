"use client";

import { defaultEEInfo } from "@/utils/constants";
import { IEEInfo } from "@/utils/interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface ContextProps {
  tiffs: { fields: IEEInfo }[];
  menuRetracted: boolean;
  setMenuRetracted: (isRetracted: boolean) => void;
  descRetracted: boolean;
  setDescRetracted: (isRetracted: boolean) => void;
  loading: boolean;
  setLoading: (isRetracted: boolean) => void;
  currentVisu: { id: string; year: string | undefined };
  setCurrentVisu: ({
    id,
    year,
  }: {
    id: string;
    year: string | undefined;
  }) => void;
  currentTiff: IEEInfo;
  setCurrentTiff: (newTiff: IEEInfo) => void;
}

const DEFAULT_TIFF = "spei";

export const MapTiffContext = createContext<ContextProps>({
  tiffs: [],
  menuRetracted: false,
  setMenuRetracted: () => {},
  descRetracted: true,
  setDescRetracted: () => {},
  loading: true,
  setLoading: () => {},
  currentVisu: { id: "", year: "" },
  setCurrentVisu: () => {},
  currentTiff: defaultEEInfo,
  setCurrentTiff: () => {},
});

export const MapTiffProvider = ({
  tiffs,
  children,
}: {
  tiffs: { fields: IEEInfo }[];
  children: ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [menuRetracted, setMenuRetracted] = useState<boolean>(false);
  const [descRetracted, setDescRetracted] = useState<boolean>(true);
  const [currentTiff, setCurrentTiff] = useState<IEEInfo>(defaultEEInfo);
  const [currentVisu, setCurrentVisu] = useState({
    id: searchParams?.get("id") ?? DEFAULT_TIFF,
    year: searchParams?.get("year") || undefined,
  });

  useEffect(() => {
    const { id, year } = currentVisu;
    const params = new URLSearchParams(searchParams.toString());

    params.set("id", id);

    if (year) {
      params.set("year", year);
    } else {
      params.delete("year");
    }

    if (window.location.href.includes("/map")) {
      router.push(`${pathname}?${params.toString()}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVisu]);

  const value = {
    tiffs,
    menuRetracted,
    setMenuRetracted,
    loading,
    setLoading,
    descRetracted,
    setDescRetracted,
    currentVisu,
    setCurrentVisu,
    currentTiff,
    setCurrentTiff,
  };

  return (
    <MapTiffContext.Provider value={value}>{children}</MapTiffContext.Provider>
  );
};
