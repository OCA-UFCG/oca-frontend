"use client";

import { defaultEEInfo } from "@/utils/constants";
import { IEEInfo } from "@/utils/interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface ContextProps {
  tiffs: IEEInfo[];
  menuRetracted: boolean;
  setMenuRetracted: (isRetracted: boolean) => void;
  descRetracted: boolean;
  setDescRetracted: (isRetracted: boolean) => void;
  loading: boolean;
  setLoading: (isRetracted: boolean) => void;
  currentVisu: { id: string; year: string | undefined };
  setCurrentVisu: ({ id, year }: { id: string; year: string }) => void;
  currentTiff: IEEInfo;
  setCurrentTiff: (newTiff: IEEInfo) => void;
  currentDescription: { name: string; description: string };
  setCurrentDescription: (newDesc: {
    name: string;
    description: string;
  }) => void;
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
  currentDescription: { name: "", description: "" },
  setCurrentDescription: () => {},
});

export const MapTiffProvider = ({
  tiffs,
  children,
}: {
  tiffs: IEEInfo[];
  children: ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [menuRetracted, setMenuRetracted] = useState<boolean>(false);
  const [descRetracted, setDescRetracted] = useState<boolean>(true);
  const [currentDescription, setCurrentDescription] = useState<{
    name: string;
    description: string;
  }>({ name: "", description: "" });
  const [currentTiff, setCurrentTiff] = useState<IEEInfo>(defaultEEInfo);
  const [currentVisu, setCurrentVisu] = useState({
    id: searchParams?.get("id") ?? DEFAULT_TIFF,
    year: searchParams?.get("year") || "",
  });

  useEffect(() => {
    const { id } = currentVisu;
    let year = currentVisu.year;
    const params = new URLSearchParams(searchParams.toString());
    const { name, description, imageData } =
      tiffs.find((tiff) => tiff.id === id) || defaultEEInfo;

    if (!("general" in imageData) && !year) {
      Object.entries(imageData).forEach(([currentYear, yearInfo]) => {
        if (yearInfo.default) year = currentYear;
      });

      setCurrentVisu({ id, year });
    } else if (!year) {
      setCurrentVisu({ id, year: "general" });
    }

    params.set("id", id);

    if (year !== "general") {
      params.set("year", year);
    } else {
      params.delete("year");
    }

    if (window.location.href.includes("/map")) {
      router.push(`${pathname}?${params.toString()}`);
    }

    setCurrentDescription({ name, description });

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
    currentDescription,
    setCurrentDescription,
  };

  return (
    <MapTiffContext.Provider value={value}>{children}</MapTiffContext.Provider>
  );
};
