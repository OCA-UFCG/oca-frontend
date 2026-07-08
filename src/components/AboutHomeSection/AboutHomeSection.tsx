"use client";

import {
  AboutTitle,
  ContentModal,
  TextContainer,
  ViewMore,
  Wrapper,
  ContentWrapper,
  PhotoColumn,
} from "./AboutHomeSection.styles";
import { PhotoAlbum } from "../PhotoAlbum/PhotoAlbum";
import { IAboutSection, ISectionHeader } from "@/utils/interfaces";

const AboutHomeSection = ({
  content,
}: {
  sectionHead: ISectionHeader[];
  content: IAboutSection;
}) => {
  return (
    <Wrapper id="about">
      <ContentWrapper>
        <ContentModal>
          <AboutTitle>
            Ciência, dados e inovação para transformar territórios
          </AboutTitle>
          <TextContainer>
            <p>
              O Observatório da Caatinga e Desertificação (OCA) é um grupo
              interdisciplinar de pesquisa vinculado à Universidade Federal de
              Campina Grande (UFCG) que produz conhecimento, desenvolve
              tecnologias e gera soluções inovadoras para compreender e
              monitorar as dinâmicas socioambientais da Caatinga, do Semiárido e
              de outros territórios vulneráveis.
            </p>
            <p>
              Ao integrar ciência, dados e inovação, o OCA transforma
              conhecimento em evidências, metodologias, plataformas digitais e
              sistemas inteligentes que apoiam políticas públicas, fortalecem a
              gestão territorial e promovem o desenvolvimento sustentável.
            </p>

            <h3>Uma trajetória construída pela ciência e pela colaboração</h3>
            <p>
              Criado a partir da cooperação entre pesquisadores de diferentes
              áreas do conhecimento, o OCA consolidou-se como uma rede
              interdisciplinar dedicada ao desenvolvimento de pesquisas,
              tecnologias e soluções voltadas aos desafios socioambientais
              contemporâneos. Ao longo de mais de quinze anos de atuação, o
              Observatório ampliou sua capacidade científica e tecnológica por
              meio da integração entre universidades, instituições públicas,
              organizações da sociedade civil e parceiros nacionais e
              internacionais.
            </p>
            <p>
              Essa atuação colaborativa permitiu fortalecer a produção de
              conhecimento sobre desertificação, mudanças climáticas, serviços
              ecossistêmicos, segurança hídrica, inteligência territorial e
              desenvolvimento sustentável, consolidando o OCA como uma
              referência na produção de evidências para políticas públicas.
            </p>

            <h3>Da pesquisa à transformação dos territórios</h3>
            <p>
              Mais do que produzir conhecimento científico, o OCA atualmente
              desenvolve soluções capazes de apoiar a tomada de decisão e gerar
              impacto para a sociedade.
            </p>
            <p>Suas principais áreas de atuação incluem:</p>
            <ul>
              <li>monitoramento socioambiental e inteligência territorial;</li>
              <li>análise geoespacial e sensoriamento remoto;</li>
              <li>
                Plataformas digitais e ferramentas de apoio à gestão
                territorial;
              </li>
              <li>Indicadores e evidências para políticas públicas.</li>
            </ul>
            <p>
              Essas competências dão origem a projetos que transformam ciência
              em aplicações concretas, como plataformas de dados, sistemas de
              monitoramento ambiental, metodologias de planejamento territorial
              e ferramentas de apoio à decisão.
            </p>

            <h4>NOSSOS PROJETOS</h4>
            <p>
              <strong>Data Nordeste</strong>
              <br />
              Dados estratégicos reunidos em uma única plataforma
            </p>
          </TextContainer>
          <ViewMore href="/about">Ler mais</ViewMore>
        </ContentModal>
        <PhotoColumn>
          <PhotoAlbum photos={content.albumCollection.items} />
        </PhotoColumn>
      </ContentWrapper>
    </Wrapper>
  );
};

export default AboutHomeSection;
