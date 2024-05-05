import { Container, Title } from "./Sponsors.styles";
import Sponsor from "../Sponsor";

const Sponsors = () => {
  const sponsors = [
    {
      name: "Cemaden",
      logo: "https://drive.google.com/thumbnail?id=1vU139aIwQhEI87AB_VgitF7vQb7F1ovb",
    },
    {
      name: "Embrapa",
      logo: "https://drive.google.com/thumbnail?id=11BcUGnqLcKs4b9y8f5PFzJoPDf8I14I0",
    },
    {
      name: "Inpe",
      logo: "https://drive.google.com/thumbnail?id=1JmSTRqYspChCR7-JFAFZb8AhIX-gKxJo",
    },
    {
      name: "Insa",
      logo: "https://drive.google.com/thumbnail?id=1JGujfYROAcG5b1CUweT3nkBM9ftWXJ4R",
    },
    {
      name: "MMA",
      logo: "https://drive.google.com/thumbnail?id=1avptpwxYt1jFgifgoow3swkcrmqOwQ0I",
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
    {
      name: "Universidade de Lisboa",
      logo: "https://drive.google.com/thumbnail?id=1mAwbhgpyHxKfiRRBPEvYLkLlHh9WyWt5",
    },
    {
      name: "University of Bristol",
      logo: "https://drive.google.com/thumbnail?id=1-FbK9NC-4BJZlwMrDp6u6D7vf_fTPEcT",
    },
  ];

  return (
    <>
      <Title>Parceiros</Title>
      <Container>
        {sponsors.map((sponsor, index) => (
          <Sponsor key={index} data={sponsor} />
        ))}
      </Container>
    </>
  );
};

export default Sponsors;
