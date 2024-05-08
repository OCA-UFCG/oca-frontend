import { ISponsor } from "@/utils/interfaces";
import { Wrapper, LogoImage } from "./Sponsor.styles";

const Sponsor = ({ data }: { data: ISponsor }) => {
  const { name, logo, link } = data;

  return (
    <Wrapper href={link} target="_blank">
      <LogoImage
        src={logo}
        alt={name}
        title={name}
        width={125}
        height={125}
      />
    </Wrapper>
  );
};

export default Sponsor;
