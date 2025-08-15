"use client";

import { useContext, useMemo, useRef } from "react";
import {
  Wrapper,
  RangeInput,
  InputWrapper,
  DateContainer,
  DateSpan,
  Divider,
} from "./DateInput.styles";
import { MapTiffContext } from "@/contexts/MapContext";

const DateInput = () => {
  const { tiffs, loading, currentVisu, setCurrentVisu } =
    useContext(MapTiffContext);
  const dates = useMemo(
    () => tiffs.find((tiff) => tiff.id === currentVisu.id)?.imageData || {},

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentVisu.id],
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const updateFields = (index: number) => {
    const year = Object.keys(dates)[Number(index)];
    if (inputRef.current) inputRef.current.value = [index + 1].toString();
    inputRef?.current?.focus();

    const { id } = currentVisu;
    setCurrentVisu({ id, year });
  };

  return (
    <Wrapper $disabled={loading.toString()}>
      {Object.keys(dates).length > 0 &&
        !(Object.keys(dates)[0] === "general") && (
          <InputWrapper>
            <RangeInput
              disabled={loading}
              type="range"
              ref={inputRef}
              min={1}
              value={
                Object.keys(dates).findIndex(
                  (date) => date === currentVisu.year,
                ) + 1
              }
              max={Object.keys(dates).length}
              onChange={(e) => updateFields(Number(e.target.value) - 1)}
            />
            <DateContainer>
              {Object.keys(dates).map((date, index) => (
                <div key={date}>
                  <DateSpan
                    $isCurrent={(
                      (index + 1).toString() === inputRef?.current?.value ||
                      false
                    ).toString()}
                    $active={loading.toString()}
                    onClick={() => updateFields(index)}
                  >
                    {date}
                  </DateSpan>
                  <Divider />
                </div>
              ))}
            </DateContainer>
          </InputWrapper>
        )}
    </Wrapper>
  );
};

export default DateInput;
