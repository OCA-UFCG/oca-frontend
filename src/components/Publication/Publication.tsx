import { IPublication } from "@/utils/interfaces";
import {
  Card,
  Type,
  CardTitle,
  TypeContainer,
  ArrowIcon,
  IconContainer,
  SecondArrowIcon,
} from "./Publication.styles";
import { getDeterministicColor } from "@/utils/themes";
import { useTheme } from "styled-components";

const Publication = ({ data }: { data: IPublication }) => {
  const { title, href, type } = data;
  const maxContentLength = 150;
  const theme = useTheme();

  const bgColor = getDeterministicColor(title, [
    theme.colors.green,
    theme.colors.maroon,
    theme.colors.yellow,
    theme.colors.orange,
  ]);

  return (
    <Card
      href={href}
      target="_blank"
      title={title}
      style={{ backgroundColor: bgColor }}
    >
      <TypeContainer>
        <Type>{type}</Type>
        <IconContainer>
          <ArrowIcon id="link-arrow" size={12} />
          <SecondArrowIcon id="link-arrow" size={12} />
        </IconContainer>
      </TypeContainer>
      <CardTitle>
        {title.length > maxContentLength
          ? title.slice(0, maxContentLength) + "..."
          : title}
      </CardTitle>
    </Card>
  );
};

export default Publication;
