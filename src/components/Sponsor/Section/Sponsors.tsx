import { Container, Title } from "./Sponsors.styles";
import Sponsor from "../Sponsor";

const Sponsors = () => {
  const sponsors = [
    {
      name: "Bristol",
      logo: "https://drive.google.com/thumbnail?id=19puh-yvYK-JTcYKyTl4oaZXQWRss7Vrd",
    },
    {
      name: "Cemaden",
      logo: "https://drive.google.com/thumbnail?id=1vU139aIwQhEI87AB_VgitF7vQb7F1ovb",
    },
    {
      name: "Embrapa",
      logo: "https://drive.google.com/thumbnail?id=11DzzYXPiLGkxE5ofZqIhDpFVcQH7qRpn",
    },
    {
      name: "Inpe",
      logo: "https://drive.google.com/thumbnail?id=1JmSTRqYspChCR7-JFAFZb8AhIX-gKxJo",
    },
    {
      name: "Insa",
      logo: "https://drive.google.com/thumbnail?id=1Clzr7BGWniro2Oh7rd3jEkG7rD_HGerc",
    },
    {
      name: "lisboa",
      logo: "https://drive.google.com/thumbnail?id=1ty9D212kZlJgbZJa4y4L3jOoxMiOrO7P",
    },
    {
      name: "MMA",
      logo: "https://drive.google.com/thumbnail?id=1x70gB8NkmqWaEfrKzpK3gs0PpUBZEMJs",
    },
    {
      name: "UEPB",
      logo: "https://drive.google.com/thumbnail?id=1jxKc-Tr8dItDO_uOl6SZklBo_FyFbHFi",
    },
    {
      name: "UFCG",
      logo: "https://drive.google.com/thumbnail?id=1o7cfKvgZ8aATotapEIv2pUY0TKeEUni_",
    },
    {
      name: "UFPB",
      logo: "https://drive.google.com/thumbnail?id=112zntMYtrMssbCb8kQKHtllM1azBxyoK",
    },
    {
      name: "UFPE",
      logo: "https://drive.google.com/thumbnail?id=1fUlnOG94sj52kLnURvgg5c_9bpCBzjTo",
    },
  ];

  const sortedSponsors = sponsors.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1; // a vem antes de b
    } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1; // a vem depois de b
    } else {
      return 0; // a e b são iguais
    }
  });

  return (
    <>
      <Title>Parceiros</Title>
      <Container>
        {sortedSponsors.map((sponsor, index) => (
          <Sponsor key={index} data={sponsor} />
        ))}
      </Container>
    </>
  );
};

export default Sponsors;
