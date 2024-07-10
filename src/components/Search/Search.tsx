"use client";

import { useRef, useState } from "react";
import { ILocationData } from "@/utils/interfaces";
import { SearchWrapper, SearchImage, SearchBackground } from "./Search.styles";
import SearchIcon from "@/../public/search-icon.svg";

const Search = ({ onClick }: { onClick: (results: ILocationData) => void }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [mapSearchResults, setMapSearchResults] = useState<{
    cities: ILocationData[];
    states: ILocationData[];
  }>({ cities: [], states: [] });
  const [isVisible, setIsVisible] = useState<boolean>(false);

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

  const setIsVisibleHandler = () => {
    setIsVisible(!isVisible);
    if (isVisible) {
      setMapSearchResults({ cities: [], states: [] });
    }
  };

  return (
    <>
      <div onClick={setIsVisibleHandler}>
        <SearchImage src={SearchIcon} alt={SearchIcon} height={16} width={16} />
      </div>
      {isVisible && (
        <SearchBackground onClick={setIsVisibleHandler}>
          <SearchWrapper onClick={(e) => e.stopPropagation()}>
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
        </SearchBackground>
      )}
    </>
  );
};

export default Search;
