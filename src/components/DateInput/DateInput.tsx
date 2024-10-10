import { IImageData, IMapInfo } from "@/utils/interfaces";
import { ChangeEvent, useEffect, useRef } from "react";
import {
  Wrapper,
  CalendarImage,
  RangeInput,
  InputWrapper,
  DateContainer,
  DateSpan,
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

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = Object.keys(dates)[Number(event.target.value) - 1];
    onChange({ name: mapId, year: newDate });
  };

  const dateKeys: string[] = Object.keys(dates);

  const updateFields = (year: string) => {
    if (inputRef.current)
      inputRef.current.value = [dateKeys.indexOf(year) + 1].toString();
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
      <CalendarImage id="calendar" size={20} />
      <InputWrapper>
        <RangeInput
          type="range"
          ref={inputRef}
          disabled={isLoading}
          min={1}
          max={Object.keys(dates).length}
          onChange={handleRangeChange}
        />
        <DateContainer>
          {Object.keys(dates).map((date: string) => (
            <DateSpan key={date} year={date} />
          ))}
        </DateContainer>
      </InputWrapper>
    </Wrapper>
  );
};

export default DateInput;
