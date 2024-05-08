import { IPublication } from "@/utils/interfaces";
import { Card, Type, CardTitle } from "./Publication.styles";

const Publication = ({ data }: { data: IPublication }) => {
  const { title, href, type } = data;
  const maxContentLength = 100

  return (
    <Card href={href} target="_blank" title={title}>
      <Type>{type}</Type>
      <CardTitle>{title.length > maxContentLength ? title.slice(0, maxContentLength) + '...' : title}</CardTitle>
    </Card>
  );
};

export default Publication;
