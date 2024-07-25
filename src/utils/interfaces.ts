export interface ISponsor {
  name: string;
  logo: { fields: { file: { url: string } } } | string;
  link: string;
}

export interface ITeamMember {
  name: string;
  role: string;
  avatar: { fields: { file: { url: string } } } | string;
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
  path: string;
  children?: { [key: string]: ISection };
}

export interface ISections {
  [key: string]: ISection;
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

export interface IImageParam {
  color: string;
  pixelLimit?: number;
  label: string;
}

export interface IEEInfo {
  id: string;
  name: string;
  description: string;
  extraInfo?: string[];
  measurementUnit: string;
  poster: { fields: { file: { url: string } } } | string;
  minScale?: number;
  maxScale?: number;
  imageData: {
    [year: string]: {
      default: boolean;
      imageId: string;
      imageParams: IImageParam[];
    };
  };
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

export interface IFormItem {
  id: string;
  name: string;
  checked: boolean;
  imageData: IImageData;
}

export interface IImageData {
  [year: string]: IImageProps;
}

export interface IImageProps {
  default?: boolean;
  imageId: string;
  pallete?: string[];
}
