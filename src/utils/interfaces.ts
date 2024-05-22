export interface ISponsor {
  name: string;
  logo: string;
  link: string;
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

export interface IPublication {
  title: string;
  type: string;
  href: string;
}

export interface IVisuMenuItems {
  id: string;
  name: string;
  checked: boolean;
}

export interface IEEImage {
  [id: string]: IEEInfo;
}

export interface IEEInfo {
  name: string;
  id: string;
  imageId: string;
  posterUrl: string;
  description: string;
}

export interface IFormItem {
  id: string;
  name: string;
  checked: boolean;
}
