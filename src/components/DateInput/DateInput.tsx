import { IImageData } from "@/utils/interfaces";
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
  dates: IImageData;
  onChange: (name: string, year: string) => void;
}) => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = Object.keys(dates)[Number(event.target.value) - 1];
    setCurrentDate(newDate);
    onChange(mapId, newDate);
  };

  useEffect(() => {
    const dateKeys: string[] = Object.keys(dates);

    dateKeys.map((date: string, index: number) => {
      if (dates[date].default) {
        onChange(mapId, date);
        setCurrentDate(date);
        if (inputRef.current) inputRef.current.value = [index + 1].toString();
      }
    });
  }, [dates, mapId, onChange]);

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
