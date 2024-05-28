"use client";

import Link from "next/link";
import { SectionTitle } from "../globalStyles";
import { ContentWrapper, OcaImage } from "./styles";
import OcaLogo from "@/../public/logo-oca-full.svg";
import Template from "@/templates/hubTemplate";

const About = () => {
  return (
    <Template>
      <ContentWrapper>
        <OcaImage src={OcaLogo} alt="oi" />
        <SectionTitle>Nossa história</SectionTitle>
        <article>
          <p>
            O Observatório da Caatinga e Desertificação surge a partir de um
            esforço colaborativo para promover a pesquisa, o monitoramento e
            para subsidiar a construção eficiente de políticas públicas. Nos
            últimos quinze anos os pesquisadores do observatório esteve
            empenhado em promover a integração das pesquisas, na busca por uma
            avaliação eficiente dos serviços ambientais prestados pelo
            ecossistema Caatinga. Entre as principais ações e metas do
            Observatório da Caatinga e Desertificação estão:
          </p>
          <ul>
            <li>
              Gerar informações consistentes, sistematizadas e disponibilizadas
              a diferentes públicos-alvo;
            </li>
            <li>
              Formar uma rede de pesquisa de referência Nacional e Internacional
              sobre a modelagem ambiental, climática e socioeconômica;
            </li>
            <li>
              Consolidar e ampliar a base técnico-científica de pesquisa sobre
              processos de desertificação, mudanças climáticas, modelagem
              socioeconômica e ambiental;
            </li>
            <li>
              Subsidiar a criação de políticas públicas e modelos de utilização
              que promovam a conservação e a sustentabilidade dos recursos
              naturais.
            </li>
          </ul>
          <p>
            O Observatório da Caatinga e Desertificação é constituído por uma
            diversa rede de pesquisadores (link:{" "}
            <a
              href="https://docs.google.com/document/d/1rruWPyerZ6jVIONI7IySVfF2pv1deeT6dyFpPggRL3c/edit"
              target="_blank"
            >
              Consultar rede de pesquisadores
            </a>
            ). Os princípios aplicados à rede de pesquisadores do Observatório
            da Caatinga e Desertificação são cooperação e interação
            institucional, os quais são fortalecidos pelo compartilhamento de
            infraestrutura e conhecimento (Link:{" "}
            <a
              href="https://docs.google.com/presentation/d/1ShjzByNn61fG_D6oNH_Oq9QNhpMqGsr3/edit?rtpof=true&sd=true"
              target="_blank"
            >
              Conheça a infraestrutura do Observatório
            </a>
            ). Os pesquisadores deste observatório acreditam na importância de
            promover um constante diálogo entre diferentes saberes, fomentando o
            intercâmbio de conhecimento e a prática reflexiva por meio da
            pesquisa-ação. Além disso, valorizamos profundamente a riqueza da
            cultura regional e a diversidade humana, reconhecendo que esses
            elementos são essenciais para construir uma sociedade mais inclusiva
            e justa.{" "}
          </p>
          <p>
            O processo de desertificação é a principal preocupação ambiental na
            Caatinga, resultando na perda da cobertura florestal, baixa produção
            primária, degradação do solo e perda de biodiversidade. Como
            consequência, ocorre a redução da capacidade do ecossistema de
            fornecer serviços importantes para a manutenção do clima, desde a
            escala local até a global. A missão do Observatório do Caatinga e
            Desertificação de monitorar a desertificação no bioma Caatinga tomou
            proporção nacional devido a participação dos pesquisadores do
            observatório no núcleo de coordenação para construção do 2º Plano de
            Ação Brasileiro de Combate à Desertificação e Mitigação aos Efeitos
            da Seca (2º PAB BRASIL). No 2º PAB BRASIL o observatório esteve
            responsável por toda construção da base de dados sobre o estado da
            degradação, frequência de ocorrência de secas, demografia e
            socioeconômicos. Os mapas e análises foram realizadas para os
            estados com Áreas Suscetíveis à Desertificação (AL, BA, CE, MA, PB,
            PE, PI, RN, SE, MG) e também as quatro regiões do Brasil (
            <Link
              href="https://drive.google.com/file/d/1_ncdNBnVYdfRN65TeUp6opgUQZxXNhNG/view?usp=sharing"
              target="_blank"
            >
              Norte
            </Link>
            ,{" "}
            <Link
              href="https://drive.google.com/file/d/1WN4lB6cIBtApOWBdrmTi8eKjyE2__MTc/view?usp=sharing"
              target="_blank"
            >
              Centro-Oeste
            </Link>
            ,{" "}
            <Link
              href="https://drive.google.com/file/d/1kxDxvE-iCVzcg0ApB05QQalskEdFe1ie/view?usp=sharing"
              target="_blank"
            >
              Sul
            </Link>
            ,{" "}
            <Link
              href="https://drive.google.com/file/d/1F9TPEuMz0rGCF-LzeVHvJGAv-iufsCXJ/view?usp=sharing"
              target="_blank"
            >
              Sudeste
            </Link>
            ) e{" "}
            <Link
              href="https://drive.google.com/file/d/1FWogghJc3WZYSVeNV7FmylW82eEHSRRN/view?usp=drive_link"
              target="_blank"
            >
              Nacional
            </Link>
            .
          </p>
          <p>
            As atividades do Observatório da Caatinga e Desertificação estão
            focados na modelagem de processos ambientais, sociais e na gestão
            socioambiental, onde utilizamos uma variedade de algoritmos, isso
            inclui: Desenvolvimento de plataformas computacionais para geração
            de banco de dados regionais -{" "}
            <Link
              href="https://doi.org/10.1016/j.cageo.2019.104341"
              target="_blank"
            >
              Artigo 1
            </Link>
            ; Desenvolvimento de algoritmo para detectar espacial e temporal o
            desmatamento na Caatinga -{" "}
            <Link
              href="https://doi.org/10.1016/j.rse.2019.111250"
              target="_blank"
            >
              Artigo 2
            </Link>
            ; Desenvolvimento de modelos computacionais para representação do
            ecossistema da Caatinga: Evapotranspiração -{" "}
            <Link
              href="https://doi.org/10.1016/j.agrformet.2023.109408"
              target="_blank"
            >
              Artigo 3
            </Link>
            ; Interceptação -
            <Link
              href="https://doi.org/10.1016/j.jhydrol.2024.130672"
              target="_blank"
            >
              Artigo 4
            </Link>
            ; Fenologia -{" "}
            <Link
              href="https://doi.org/10.3389/fenvs.2023.1275844"
              target="_blank"
            >
              Artigo 5
            </Link>
            ; Produtividade Primária -{" "}
            <Link href="https://doi.org/10.3390/f14040828" target="_blank">
              Artigo 6
            </Link>
            ; Desenvolvimento de metodologia para classificação da cobertura do
            solo em áreas de Caatinga -{" "}
            <Link
              href="https://doi.org/10.1016/j.rsase.2021.100515"
              target="_blank"
            >
              Artigo 7
            </Link>
            ; Histórico de monitoramento de variáveis ambientais –{" "}
            <Link href="http://dx.doi.org/10.1002/hyp.14194" target="_blank">
              Artigo 8
            </Link>
            .
          </p>
          <p>
            Nos próximos anos o Observatório da Caatinga e Desertificação espera
            continuar o desenvolvimento de modelos e ferramentas computacionais
            robustos, capazes de subsidiar políticas públicas e iniciativas de
            pagamento por serviços ecossistêmicos na Caatinga, contribuindo
            assim para a conservação desse importante bioma e o bem-estar das
            comunidades locais. Neste sentido, é essencial continuar a
            realização de pesquisas nas seguintes áreas:
          </p>
          <ol>
            <li>
              Modelagem Ambiental e Climática: Desenvolvimento de modelos
              computacionais para prever padrões climáticos, mudanças na
              cobertura do solo e fluxos de energia e água na Caatinga. Isso
              inclui a análise da interação entre fatores climáticos e
              biológicos para compreender melhor as dinâmicas do ecossistema.
            </li>
            <li>
              Mapeamento da Desertificação: Pesquisas focadas na identificação e
              monitoramento das áreas suscetíveis à desertificação na Caatinga,
              utilizando técnicas de sensoriamento remoto, geoprocessamento e
              análise de séries temporais de dados ambientais.{" "}
            </li>
            <li>
              Avaliação dos Serviços Ecossistêmicos: Estudos para quantificar e
              valorar os serviços ecossistêmicos fornecidos pela Caatinga, como
              regulação do clima, sequestro de carbono, armazenamento de água,
              produção de alimentos e biodiversidade. Isso pode incluir métodos
              econômicos e ambientais para estimar os benefícios desses
              serviços.{" "}
            </li>
            <li>
              Desenvolvimento de Plataformas Computacionais: Construção de
              plataformas computacionais acessíveis e interativas que integrem
              dados de diferentes fontes e forneçam ferramentas de análise e
              visualização para gestores públicos e sociedade civil. Essas
              plataformas podem facilitar a tomada de decisões baseadas em
              evidências e promover o desenvolvimento econômico sustentável na
              região.
            </li>
          </ol>
        </article>
      </ContentWrapper>
    </Template>
  );
};

export default About;
