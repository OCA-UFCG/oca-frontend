"use client";

import "./reset.css";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IMapInfo } from "@/utils/interfaces";
import MapTiff from "@/components/MapTiff/MapTiff";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MapPage = () => {
  const searchParams = useSearchParams();
  const visu = searchParams?.get("visu");

  const [imageData, setImageData] = useState<IMapInfo>({
    name: "",
    year: "",
  });

  useEffect(() => {
    if (visu) {
      const name = visu;
      const year = "";
      setImageData({ name, year });
    }
  }, [visu]);

  return (
    <Wrapper>
      <MapTiff data={imageData} />
    </Wrapper>
  );
};

export default MapPage;
