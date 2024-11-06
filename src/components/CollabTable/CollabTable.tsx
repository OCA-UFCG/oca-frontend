import { Icon } from "../Icon/Icon";
import {
  BodyItem,
  HeadItem,
  MediaWrapper,
  Row,
  Table,
  TableBody,
  TableHead,
} from "./CollabTable.styles";

const CollabTable = ({ content }: { content: any[] }) => {
  content.sort((a, b) => {
    const nameA = a.fields.name.toLowerCase();
    const nameB = b.fields.name.toLowerCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;

    return 0;
  });

  return (
    <Table>
      <TableHead>
        <Row>
          <HeadItem>Nome</HeadItem>
          <HeadItem>Instituição</HeadItem>
          <HeadItem>Área de atuação</HeadItem>
          <HeadItem>Redes</HeadItem>
        </Row>
      </TableHead>
      <TableBody>
        {content.map(({ fields }, index) => {
          const { name, institution, fieldWork, github, linkedin, lattes } =
            fields;

          return (
            <Row key={index}>
              <BodyItem>{name}</BodyItem>
              <BodyItem>{institution}</BodyItem>
              <BodyItem>{fieldWork?.join(", ")}</BodyItem>
              <BodyItem>
                <MediaWrapper>
                  {lattes && (
                    <a href={lattes} target="_blank" title={lattes}>
                      <Icon id="lattes" size={20} />
                    </a>
                  )}
                  {linkedin && (
                    <a href={linkedin} target="_blank" title={linkedin}>
                      <Icon id="linkedin" size={20} />
                    </a>
                  )}
                  {github && (
                    <a href={github} target="_blank" title={github}>
                      <Icon id="github" size={20} />
                    </a>
                  )}
                </MediaWrapper>
              </BodyItem>
            </Row>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CollabTable;
