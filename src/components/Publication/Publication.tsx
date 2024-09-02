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

const Publication = ({ data }: { data: IPublication }) => {
  const { title, href, type } = data;
  const maxContentLength = 150;

  return (
    <Card href={href} target="_blank" title={title}>
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
