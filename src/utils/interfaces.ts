export interface ISponsor {
  name: string;
  logo: string;
}

export interface ITeamMember {
  name: string;
  role: string;
  avatar: string;
  github?: string;
  linkedin?: string;
  lattes?: string;
}

export interface ISocialMedia {
  name: string;
  icon: string;
  href: string | undefined;
}

export interface IOCAChannel {
  name: string;
  href: string;
  icon: string;
}

export interface ISection {
  name: string;
  href: string;
}