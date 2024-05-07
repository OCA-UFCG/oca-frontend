import { IPublication } from "@/utils/interfaces";
import { Card, Type, Content } from "./Publication.styles";

const Publication = ({ data }: { data: IPublication }) => {
  const { title, href, type } = data;

  return (
    <Card>
      <Type>{type}</Type>
      <Content href={href} target="_blank">{title}</Content>
    </Card>
  );
};

export default Publication;
