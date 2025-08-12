import { ISponsor } from "@/utils/interfaces";
import { Wrapper, LogoImage } from "./Sponsor.styles";

const Sponsor = ({ data }: { data: ISponsor }) => {
  const { name, logo, link } = data;

  const proportion = logo.height / logo.width;

  return (
    <Wrapper href={link} target="_blank">
      <LogoImage
        src={logo.url || ""}
        alt={name}
        title={name}
        width={600}
        height={600 * proportion}
      />
    </Wrapper>
  );
};

export default Sponsor;
