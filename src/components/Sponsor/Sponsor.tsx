import { ISponsor } from "@/interfaces/Sponsor";
import { Container, Logo } from "./Sponsor.styles";

const Sponsor = ({ data }: { data: ISponsor }) => {
  const { name, logo } = data;

  return (
    <Container>
      <Logo src={logo || "logo.svg"} title={name} />
    </Container>
  );
};

export default Sponsor;
