import { Container } from "./Sponsors.styles";
import Sponsor from "../Sponsor"

const Sponsors = () => {
  const sponsors = [
    {
      name: "Bristol",
      logo: "bristol.svg",
    },
    {
      name: "Cemaden",
      logo: "cemaden.svg",
    },
    {
      name: "Inpe",
      logo: "inpe.svg",
    },
    {
      name: "Insa",
      logo: "insa.svg",
    },
    {
      name: "lisboa",
      logo: "lisboa.svg",
    },
    {
      name: "embrapa",
      logo: "embrapa.svg",
    },
  ];

  return (
    <Container>
      {sponsors.map((sponsor, index) => (
        <Sponsor key={index} data={sponsor} />
      ))}
    </Container>
  );
};

export default Sponsors;