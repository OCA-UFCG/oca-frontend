import { IImageData, IMapInfo } from "@/utils/interfaces";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import calendarIcon from "@/../public/calendar.svg";
import {
  Wrapper,
  DateInfo,
  CalendarImage,
  RangeInput,
  DateList,
  InputWrapper,
  DateItem,
} from "./DateInput.styles";

const DateInput = ({
  mapId,
  dates,
  onChange,
}: {
  mapId: string;
  initialYear?: string;
  dates: IImageData;
  onChange: (newValues: IMapInfo) => void;
}) => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = Object.keys(dates)[Number(event.target.value) - 1];
    setCurrentDate(newDate);
    onChange({ name: mapId, year: newDate });
  };

  const dateKeys: string[] = Object.keys(dates);

  const updateFields = (year: string) => {
    if (inputRef.current)
      inputRef.current.value = [dateKeys.indexOf(year) + 1].toString();
    setCurrentDate(year);
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
    <Wrapper disabled={("general" in dates).toString()}>
      <CalendarImage
        src={calendarIcon}
        alt={calendarIcon}
        height={20}
        width={20}
      />
      <DateInfo>{dates?.general ? "--" : currentDate}</DateInfo>
      <InputWrapper>
        <RangeInput
          disabled={"general" in dates}
          type="range"
          ref={inputRef}
          min={1}
          max={Object.keys(dates).length}
          onChange={handleRangeChange}
        />
        <DateList>
          {Object.keys(dates).map((date: string) => (
            <DateItem key={date} />
          ))}
        </DateList>
      </InputWrapper>
    </Wrapper>
  );
};

export default DateInput;
