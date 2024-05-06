import { ISponsor } from "@/interfaces";
import { Wrapper, LogoImage } from "./Sponsor.styles";

const Sponsor = ({ data }: { data: ISponsor }) => {
  const { name, logo } = data;

  return (
    <Wrapper>
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
