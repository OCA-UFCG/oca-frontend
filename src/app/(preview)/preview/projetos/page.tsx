import Template from "@/app/(preview)/preview/_components/Template";
import { ProjectCard } from "@/app/(preview)/preview/_components/Blocks";
import {
  Heading,
  HeroGrid,
  Numbers,
  Title,
} from "@/app/(preview)/preview/_components/styles";
import { PROJECTS } from "@/utils/projects";
import { Grid, List } from "./styles";

// Números do Figma de 08/11/2026.
const NUMBERS = [
  { value: "09+", label: "projetos" },
  { value: "05+", label: "plataformas" },
  { value: "50+", label: "parceiros" },
];

export default function Projects() {
  return (
    <Template>
      <HeroGrid $blob="/redesign/blob-verde-projetos.svg">
        <div>
          <Title>Projetos</Title>
          <p>
            Nossos projetos integram ciência, dados e inovação para orientar
            decisões públicas e apoiar ações de conservação ambiental,
            convivência com a seca e desenvolvimento territorial.
          </p>
        </div>
        <Numbers aria-label="Projetos em números">
          {NUMBERS.map(({ value, label }) => (
            <li key={label}>
              <strong>{value}</strong>
              {label}
            </li>
          ))}
        </Numbers>
      </HeroGrid>

      <List>
        <Heading>Todos os projetos</Heading>
        <Grid>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Grid>
      </List>
    </Template>
  );
}
