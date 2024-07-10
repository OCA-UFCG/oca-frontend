"use client";

import { useRef, useState } from "react";
import { ILocationData } from "@/utils/interfaces";
import { SearchWrapper } from "./Search.styles";

const Search = ({ onClick }: { onClick: (results: ILocationData) => void }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [mapSearchResults, setMapSearchResults] = useState<{
    cities: ILocationData[];
    states: ILocationData[];
  }>({ cities: [], states: [] });

  let handler: string | number | NodeJS.Timeout | undefined;

  const getResults = async (type: string) => {
    const url = `https://nominatim.openstreetmap.org/search?${type}=${searchInputRef.current?.value}&country=brasil&format=json`;
    const response = await fetch(url);

    return await response.json();
  };

  const fetchSearchResults = async () => {
    const cityData = await getResults("city");
    const stateData = await getResults("state");
    setMapSearchResults({ cities: cityData, states: stateData });
  };

  const useDebounce = () => {
    clearTimeout(handler);
    handler = setTimeout(() => {
      fetchSearchResults();
    }, 800);
  };

  return (
    <SearchWrapper>
      <input
        name="search"
        id="search"
        ref={searchInputRef}
        onChange={useDebounce}
      />
      <p>City</p>
      {mapSearchResults.cities.map((result) => (
        <div key={result.place_id} onClick={() => onClick(result)}>
          {result.addresstype === "municipality" && result.name}
        </div>
      ))}
      <p>State</p>
      {mapSearchResults.states.map((result) => (
        <div key={result.place_id} onClick={() => onClick(result)}>
          {result.addresstype === "state" && result.name}
        </div>
      ))}
    </SearchWrapper>
  );
};

export default Search;
