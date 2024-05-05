import { ISponsor } from "@/interfaces/Sponsor";
import { Wrapper, LogoImage } from "./Sponsor.styles";

const Sponsor = ({ data }: { data: ISponsor }) => {
  const { name, logo } = data;

  return (
    <Wrapper>
      <LogoImage src={logo || "logo.svg"} alt={name} title={name} width={125} height={125}/>
    </Wrapper>
  );
};

export default Sponsor;
