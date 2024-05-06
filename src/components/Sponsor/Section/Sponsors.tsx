import { ISponsor } from "@/interfaces/Sponsor";
import { SessionTitle } from "@/app/globalStyles";
import { Wrapper } from "./Sponsors.styles";
import Sponsor from "../Sponsor";

const Sponsors = () => {
  const sponsors: ISponsor[] = [
    {
      name: "Centro Nacional de Monitoramento e Alertas de Desastres Naturais",
      logo: "https://drive.google.com/thumbnail?id=1vU139aIwQhEI87AB_VgitF7vQb7F1ovb",
    },
    {
      name: "Empresa Brasileira de Pesquisa Agropecuária",
      logo: "https://drive.google.com/thumbnail?id=11BcUGnqLcKs4b9y8f5PFzJoPDf8I14I0",
    },
    {
      name: "Instituto Nacional de Pesquisas Espaciais",
      logo: "https://drive.google.com/thumbnail?id=1JmSTRqYspChCR7-JFAFZb8AhIX-gKxJo",
    },
    {
      name: "Instituto Nacional do Semiárido",
      logo: "https://drive.google.com/thumbnail?id=1JGujfYROAcG5b1CUweT3nkBM9ftWXJ4R",
    },
    {
      name: "Ministério do Meio Ambiente e Mudança do Clima",
      logo: "https://drive.google.com/thumbnail?id=1avptpwxYt1jFgifgoow3swkcrmqOwQ0I",
    },
    {
      name: "Universidade Estadual da Paraíba",
      logo: "https://drive.google.com/thumbnail?id=1jxKc-Tr8dItDO_uOl6SZklBo_FyFbHFi",
    },
    {
      name: "Universidade Federal de Campina Grande",
      logo: "https://drive.google.com/thumbnail?id=1o7cfKvgZ8aATotapEIv2pUY0TKeEUni_",
    },
    {
      name: "Universidade Federal da Paraíba",
      logo: "https://drive.google.com/thumbnail?id=112zntMYtrMssbCb8kQKHtllM1azBxyoK",
    },
    {
      name: "Universidade Federal de Pernambuco",
      logo: "https://drive.google.com/thumbnail?id=1fUlnOG94sj52kLnURvgg5c_9bpCBzjTo",
    },
    {
      name: "Universidade de Lisboa",
      logo: "https://drive.google.com/thumbnail?id=1mAwbhgpyHxKfiRRBPEvYLkLlHh9WyWt5",
    },
    {
      name: "Universidade de Bristol",
      logo: "https://drive.google.com/thumbnail?id=1-FbK9NC-4BJZlwMrDp6u6D7vf_fTPEcT",
    },
  ];

  return (
    <section id="sponsors">
      <SessionTitle>Parceiros</SessionTitle>
      <Wrapper>
        {sponsors.map((sponsor, index) => (
          <Sponsor key={index} data={sponsor} />
        ))}
      </Wrapper>
    </section>
  );
};

export default Sponsors;
