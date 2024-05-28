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

export interface IEEImage {
  [id: string]: IEEInfo;
}

export interface IEEInfo {
  id: string;
  name: string;
  description: string;
  imageData: {
    [year: string]: {
      default: boolean;
      imageId: string;
      pallete?: string[];
      colorNumbers?: number[];
    };
  };
  posterUrl: string;
  minScale?: number;
  maxScale?: number;
}

export interface IMapId {
  mapid: string;
  token: string;
  urlFormat: string;
}

export interface IMapInfo {
  name: string;
  year?: string;
}
