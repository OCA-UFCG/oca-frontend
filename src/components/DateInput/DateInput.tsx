import { IImageData } from "@/utils/interfaces";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import calendarIcon from "@/../public/calendar.svg";
import {
  Wrapper,
  DateInfo,
  CalendarImage,
  RangeInput,
} from "./DateInput.styles";

const DateInput = ({
  dates,
  onChange,
}: {
  dates: IImageData;
  onChange: (year: string) => void;
}) => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = Object.keys(dates)[Number(event.target.value) - 1];
    setCurrentDate(newDate);
    onChange(newDate);
  };

  useEffect(() => {
    const dateKeys: string[] = Object.keys(dates);

    dateKeys.map((date: string, index: number) => {
      if (dates[date].default && !("general" in dates)) {
        setCurrentDate(date);
        if (inputRef.current) inputRef.current.value = [index + 1].toString();
      }
    });
  }, [setCurrentDate, dates]);

  return (
    <Wrapper disabled={("general" in dates).toString()}>
      <CalendarImage
        src={calendarIcon}
        alt={calendarIcon}
        height={20}
        width={20}
      />
      <DateInfo>{dates?.general ? "--" : currentDate}</DateInfo>
      <RangeInput
        disabled={"general" in dates}
        type="range"
        ref={inputRef}
        min={1}
        max={Object.keys(dates).length}
        onChange={handleRangeChange}
      />
    </Wrapper>
  );
};

export default DateInput;
