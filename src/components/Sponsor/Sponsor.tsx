import { ISponsor } from "@/interfaces/Sponsor";
import { Container, Logo } from "./Sponsor.styles";

const Sponsor = ({ data }: { data: ISponsor }) => {
  const { name, logo } = data;

  return (
    <Container>
      <Logo src={logo || "logo.svg"} alt={name} width={125} height={125}/>
    </Container>
  );
};

export default Sponsor;
