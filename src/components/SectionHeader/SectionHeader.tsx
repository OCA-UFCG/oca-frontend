import { SectionTitle } from "@/app/globalStyles";
import { SubTitle, Wrapper } from "./SectionHeader.styles";
import { ISectionHeader } from "@/utils/interfaces";

export const SectionHeader = ({
  id,
  sectionHead,
  alignment = "center",
}: {
  id: string;
  alignment?: "start" | "center" | "end";
  sectionHead: ISectionHeader[];
}) => {
  const header = sectionHead?.find((head: ISectionHeader) => head.id === id);

  const { title, subtitle } = header || {
    title: "",
    subtitle: undefined,
  };

  return (
    <Wrapper $alignment={alignment}>
      <SectionTitle>{title}</SectionTitle>
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
    </Wrapper>
  );
};
