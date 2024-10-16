"use client";

import { IImageData, IMapInfo } from "@/utils/interfaces";
import { ChangeEvent, useEffect, useRef } from "react";
import {
  Wrapper,
  RangeInput,
  InputWrapper,
  DateContainer,
  DateSpan,
  Divider,
} from "./DateInput.styles";

const DateInput = ({
  mapId,
  dates,
  isLoading,
  onChange,
}: {
  mapId: string;
  isLoading: boolean;
  initialYear?: string;
  dates: IImageData;
  onChange: (newValues: IMapInfo) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dateKeys: string[] = Object.keys(dates);
  const hasGeneralDate = "general" in dates;

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = Object.keys(dates)[Number(event.target.value) - 1];
    onChange({ name: mapId, year: newDate });
  };

  const updateFields = (year: string) => {
    if (inputRef.current)
      inputRef.current.value = [dateKeys.indexOf(year) + 1].toString();
    inputRef?.current?.focus();

    onChange({ name: mapId, year: year });
  };

  useEffect(() => {
    dateKeys.map((date: string) => {
      if (dates[date].default) {
        updateFields(date);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapId]);

  return (
    <Wrapper disabled={isLoading.toString()}>
      {!hasGeneralDate && (
        <InputWrapper>
          <RangeInput
            disabled={isLoading}
            type="range"
            ref={inputRef}
            min={1}
            max={Object.keys(dates).length}
            onChange={handleRangeChange}
          />
          <DateContainer>
            {Object.keys(dates).map((date, index) => (
              <div key={date}>
                <DateSpan
                  isCurrent={(
                    (index + 1).toString() === inputRef?.current?.value || false
                  ).toString()}
                  active={isLoading.toString()}
                  onClick={() => updateFields(date)}
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
