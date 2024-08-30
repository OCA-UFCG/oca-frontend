"use client";

import { Section, SectionTitle } from "@/app/globalStyles";
import { PublicationsContainer } from "./Publications.styles";
import Publication from "../Publication";
import { IPublication } from "@/utils/interfaces";

const PublicationsSection = ({
  publications,
}: {
  publications: { fields: IPublication }[];
}) => {
  // const [publications, setPublications] = useState<
  //   Entry<EntrySkeletonType, undefined, string>[]
  // >([]);
  // const { loadData } = useContext(CMSContext);

  // useEffect(() => {
  //   loadData("publications", setPublications);
  // }, [loadData]);

  return (
    <Section full={"false"} id="publications">
      <SectionTitle>Publicações do observatório</SectionTitle>
      <PublicationsContainer>
        {publications.map((publications, index) => (
          <Publication
            key={index}
            data={publications.fields as unknown as IPublication}
          />
        ))}
      </PublicationsContainer>
    </Section>
  );
};

export default PublicationsSection;
