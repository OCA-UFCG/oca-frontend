import { LinkButton, SectionTitle } from "@/app/globalStyles";
import { CactusImage, TextContainer, Wrapper } from "./AboutSection.styles";
import Cactus from "@/../public/cactus.svg";

const AboutSection = () => {
  return (
    <Wrapper>
      <TextContainer>
        <SectionTitle>Quem somos nós?</SectionTitle>
        <p>
          O Observatório da Caatinga e Desertificação surge a partir de um
          esforço colaborativo para promover a pesquisa, o monitoramento e para
          subsidiar a construção eficiente de políticas públicas. Nos últimos
          quinze anos os pesquisadores do observatório esteve empenhado em
          promover a integração das pesquisas, na busca por uma avaliação
          eficiente dos serviços ambientais prestados pelo ecossistema Caatinga.{" "}
        </p>
        <p>
          O Observatório é constituído por uma diversa rede de pesquisadores. Os
          princípios aplicados à rede de pesquisadores do Observatório da
          Caatinga e Desertificação são cooperação e interação institucional, os
          quais são fortalecidos pelo compartilhamento de infraestrutura e
          conhecimento. Os pesquisadores deste observatório acreditam na
          importância de promover um constante diálogo entre diferentes saberes,
          fomentando o intercâmbio de conhecimento e a prática reflexiva por
          meio da pesquisa-ação. Além disso, valorizamos profundamente a riqueza
          da cultura regional e a diversidade humana, reconhecendo que esses
          elementos são essenciais para construir uma sociedade mais inclusiva e
          justa.{" "}
        </p>
        <LinkButton href="/about">Ler mais</LinkButton>
      </TextContainer>
      <CactusImage src={Cactus} alt="" />
    </Wrapper>
  );
};

export default AboutSection;
