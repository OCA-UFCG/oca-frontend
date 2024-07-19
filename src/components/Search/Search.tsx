"use client";

import { useRef, useState } from "react";
import { ILocationData } from "@/utils/interfaces";
import {
  SearchWrapper,
  SearchImage,
  SearchBackground,
  SectionTitle,
  LocationItem,
  LocationContainer,
  CityName,
  CityStateName,
  InputWrapper,
  InputComponent,
  InputSearchImage,
  InputCloseImage,
  ResultFollowIcon,
  LocationWrapper,
  NoResultsFind,
  Loading,
} from "./Search.styles";
import SearchIcon from "@/../public/search-icon.svg";
import CloseIcon from "@/../public/close-icon.svg";
import FollowIcon from "@/../public/follow-icon.svg";

const Search = ({ onClick }: { onClick: (results: ILocationData) => void }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [mapSearchResults, setMapSearchResults] = useState<{
    cities: ILocationData[];
    states: ILocationData[];
  }>({ cities: [], states: [] });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);

  let handler: string | number | NodeJS.Timeout | undefined;

  const getResults = async (type: string) => {
    const url = `https://nominatim.openstreetmap.org/search?${type}=${searchInputRef.current?.value}&country=brasil&format=json`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  };

  const fetchSearchResults = async () => {
    if (!searchInputRef.current?.value) {
      setMapSearchResults({ cities: [], states: [] });

      return;
    }
    setSearching(true);
    const cityData = await getResults("city");
    const stateData = await getResults("state");
    setSearching(false);
    setMapSearchResults({
      cities: cityData.filter(
        (location: { addresstype: string }) =>
          location.addresstype == "municipality",
      ),
      states: stateData.filter(
        (location: { addresstype: string }) => location.addresstype == "state",
      ),
    });
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

  const handleInputClear = () => {
    searchInputRef.current && (searchInputRef.current.value = "");
    setMapSearchResults({ cities: [], states: [] });
  };

  return (
    <>
      <div onClick={setIsVisibleHandler}>
        <SearchImage src={SearchIcon} alt={SearchIcon} height={16} width={16} />
      </div>
      {isVisible && (
        <SearchBackground onClick={setIsVisibleHandler}>
          <SearchWrapper onClick={(e) => e.stopPropagation()}>
            <InputWrapper htmlFor="search">
              <InputSearchImage
                src={SearchIcon}
                alt={SearchIcon}
                height={16}
                width={16}
              />
              <InputComponent
                placeholder="Buscar localidade..."
                name="search"
                id="search"
                ref={searchInputRef}
                onChange={useDebounce}
              />
              <InputCloseImage
                src={CloseIcon}
                alt={CloseIcon}
                height={16}
                width={16}
                onClick={() => handleInputClear()}
              />
            </InputWrapper>
            <LocationContainer>
              <SectionTitle>Cidade</SectionTitle>
              {searching ? (
                <Loading id="loading" />
              ) : (
                <>
                  {mapSearchResults.cities.length === 0 && (
                    <NoResultsFind>Nenhum resultado encontrado</NoResultsFind>
                  )}
                  {mapSearchResults.cities.map((result) => (
                    <LocationWrapper
                      key={result.place_id}
                      onClick={() => onClick(result)}
                    >
                      <LocationItem>
                        <CityName>{result.name}</CityName>
                        <CityStateName>
                          {result.display_name.split(", ").at(-3)}
                        </CityStateName>
                      </LocationItem>
                      <ResultFollowIcon
                        src={FollowIcon}
                        alt={FollowIcon}
                        height={16}
                        width={16}
                      />
                    </LocationWrapper>
                  ))}
                </>
              )}
            </LocationContainer>
            <LocationContainer>
              <SectionTitle>Estado</SectionTitle>
              {searching ? (
                <Loading id="loading" />
              ) : (
                <>
                  {mapSearchResults.states.length === 0 && (
                    <NoResultsFind>Nenhum resultado encontrado</NoResultsFind>
                  )}
                  {mapSearchResults.states.map((result) => (
                    <LocationWrapper
                      key={result.place_id}
                      onClick={() => onClick(result)}
                    >
                      <LocationItem>{result.name}</LocationItem>
                      <ResultFollowIcon
                        src={FollowIcon}
                        alt={FollowIcon}
                        height={16}
                        width={16}
                      />
                    </LocationWrapper>
                  ))}{" "}
                </>
              )}
            </LocationContainer>
          </SearchWrapper>
        </SearchBackground>
      )}
    </>
  );
};

export default Search;
