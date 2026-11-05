import Template from "@/templates/hubTemplate";
import { ProjectCard } from "@/components/Redesign/Blocks";
import { Heading, Title } from "@/components/Redesign/styles";
import { PROJECTS } from "@/utils/projects";
import { Grid, HeroGrid, List, Numbers } from "./styles";

// ponytail: parceiros e municípios em aberto (o design tem placeholder); trocar `null`
const NUMBERS: { value: string | null; label: string }[] = [
  { value: String(PROJECTS.length).padStart(2, "0"), label: "projetos" },
  { value: null, label: "parceiros" },
  { value: null, label: "municípios" },
];

export default function Projects() {
  return (
    <Template>
      <HeroGrid $blob="/redesign/blob-verde-projetos.svg">
        <div>
          <Title>Projetos</Title>
          <p>
            Plataformas, estudos e ferramentas que o OCA desenvolve com
            parceiros para apoiar a gestão do Semiárido e da Caatinga.
          </p>
        </div>
        <Numbers aria-label="Projetos em números">
          {NUMBERS.map(({ value, label }) => (
            <li key={label}>
              <strong>{value ?? "—"}</strong>
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
