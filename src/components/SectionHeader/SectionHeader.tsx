import { SectionTitle } from "@/app/globalStyles";
import { SubTitle, Wrapper } from "./SectionHeader.styles";

export const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <Wrapper>
      <SectionTitle>{title}</SectionTitle>
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
    </Wrapper>
  );
};
