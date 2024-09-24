import { IFormItem } from "@/utils/interfaces";
import {
  YearSelect,
  DownloadSelectorWrapper,
  QuestionMarkImg,
} from "./DownloadSelector.styles";
import { useEffect, useState } from "react";

const DownloadSelector = ({ item }: { item: IFormItem }) => {
  const convertToDownloadLink = (item: IFormItem, year?: string) => {
    const imageData = item.imageData;
    const tifInfo = imageData[year || item.year || "general"];
    const driveUrl = tifInfo.linkDrive;
    const regex = /\/d\/([a-zA-Z0-9_-]+)/;
    const match = driveUrl?.match(regex);

    if (match && match[1]) {
      const fileId = match[1];

      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }

    return "";
  };

  const [currentYear, setCurrentYear] = useState<string>(item.year);
  const [downloadLink, setDownloadLink] = useState<string>(
    convertToDownloadLink(item, currentYear),
  );

  useEffect(() => {
    setDownloadLink(convertToDownloadLink(item, currentYear));
  }, [currentYear, item]);

  return (
    <DownloadSelectorWrapper>
      <a target="_blank" href={downloadLink} title={`Baixar ${item.name}`}>
        <QuestionMarkImg id="download" height={20} width={20} />
      </a>
      <YearSelect
        value={currentYear}
        onChange={(e) => setCurrentYear(e.target.value)}
        disabled={currentYear == "general"}
      >
        {currentYear == "general" ? (
          <option value="general" disabled={true} selected={true}>
            --
          </option>
        ) : (
          Object.keys(item.imageData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))
        )}
      </YearSelect>
    </DownloadSelectorWrapper>
  );
};

export default DownloadSelector;
