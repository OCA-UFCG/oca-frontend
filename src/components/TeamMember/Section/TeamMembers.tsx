import { Container, Title } from "./TeamMembers.styles";
import TeamMember from "../TeamMember";

const TeamMembers = () => {
  const teamMembers = [
    {
      name: "Thiago Emmanuel",
      role: "Pesquisador",
      avatar: "https://avatars.githubusercontent.com/u/217297?v=4",
      lattes: "http://lattes.cnpq.br/3273998433544268",
      github: "https://github.com/thiagomanel",
    },
    {
      name: "Cilas Marques",
      role: "Desenvolvedor",
      avatar: "https://avatars.githubusercontent.com/u/38442139?v=4",
      lattes: "http://lattes.cnpq.br/9938323958493760",
      github: "https://github.com/cilasmarques",
      linkedin: "https://www.linkedin.com/in/cilas-marques-b2a889169/",
    },
    {
      name: "Mariane Zeitouni",
      role: "Desenvolvedora",
      avatar: "https://avatars.githubusercontent.com/u/62033435?v=4",
      lattes: "http://lattes.cnpq.br/2020116306846117",
      github: "https://github.com/marianezei",
      linkedin: "https://www.linkedin.com/in/mariane-zeitouni/",
    },
    {
      name: "Rodrigo Eloy",
      role: "Desenvolvedor",
      avatar: "https://avatars.githubusercontent.com/u/42751604?v=4",
      lattes: "http://lattes.cnpq.br/8806938963179285",
      github: "https://github.com/RodrigoEC",
      linkedin: "https://www.linkedin.com/in/rodrigo-eloy/",
    },
    {
      name: "Abraão Araujo",
      role: "Desenvolvedor",
      avatar: "https://avatars.githubusercontent.com/u/98324254?v=4",
      github: "https://github.com/abraaovalentim",
      linkedin: "https://www.linkedin.com/in/abra%C3%A3o-valentim-a71a31206/",
    },
    {
      name: "John Elton",
      role: "Pesquisador",
      avatar:
        "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4215941U6",
      lattes: "http://lattes.cnpq.br/7756258383405207",
    },
    {
      name: "Bianca Anacleto",
      role: "Pesquisadora",
      avatar:
        "https://drive.google.com/thumbnail?id=1KZkH-24v81XggTF3ukigI5YamShXDAeF",
      lattes: "http://lattes.cnpq.br/9462710137800556",
    },
    {
      name: "Ulisses Alencar",
      role: "Pesquisador",
      avatar:
        "https://drive.google.com/thumbnail?id=1EByN4WwlCQDBsF56YmxJeuKaPbuH6p8e",
      lattes: "http://lattes.cnpq.br/2503559135868130",
    },
    {
      name: "Laisa Daiana",
      role: "Pesquisadora",
      avatar:
        "https://drive.google.com/thumbnail?id=1hPTd9T8LfPLfmrqx3jAStJsldDA4X040",
      lattes: "http://lattes.cnpq.br/7986419824055460",
    },
    {
      name: "Sabrina Holanda",
      role: "Pesquisadora",
      avatar:
        "https://drive.google.com/thumbnail?id=1BMqHSWz4ZRx48Sz6uUpwHmgXf7c6Kzq7",
      lattes: "http://lattes.cnpq.br/5866116521996036",
    },
    {
      name: "Bruce Silva",
      role: "Pesquisador",
      avatar:
        "https://drive.google.com/thumbnail?id=1YT6Uy3MMfbOrWV8-XGSzZWSdQv6ybBuy",
      lattes: "http://lattes.cnpq.br/4323502426271751",
    },

    // {
    //   name: "Aldrin Pérez Marin",
    //   role: "Pesquisador",
    //   lattes: "http://lattes.cnpq.br/9814607951325299"
    // },

    {
      name: "Djailson da Costa Júnior",
      role: "Pesquisador",
      avatar:
        "https://drive.google.com/thumbnail?id=1bohf8pe_OOHBExTIHXsDzhTd1M-VfO4u",
      lattes: "http://lattes.cnpq.br/5883638849798637",
    },
    {
      name: "Epitácio Pedro",
      role: "Pesquisador",
      avatar:
        "https://drive.google.com/thumbnail?id=1NagAckTVbVNy33yBiJuuRJX1aVebHti8",
      lattes: "http://lattes.cnpq.br/4520909654715513",
    },
    {
      name: "Fernanda Souto",
      role: "Pesquisadora",
      avatar:
        "https://drive.google.com/thumbnail?id=1EHwNVzodR_tygs8jMQkNb6gw8TWTCg3-",
      lattes: "http://lattes.cnpq.br/6096387003107714",
    },
    {
      name: "Isabel Martins",
      role: "Pesquisadora",
      avatar:
        "https://drive.google.com/thumbnail?id=1K8ZzGSIPaA2oQtK16UMLGrCf8S6Dhnwo",
      lattes: "http://lattes.cnpq.br/7450404697631705",
    },
  ];

  const sortedTeamMembers = teamMembers.sort((a, b) => {
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
      <Title>Nossa equipe</Title>
      <Container>
        {sortedTeamMembers.map((teamMember, i) => (
          <TeamMember key={i} data={teamMember} />
        ))}
      </Container>
    </>
  );
};

export default TeamMembers;
