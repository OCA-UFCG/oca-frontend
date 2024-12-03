import { Document } from "@contentful/rich-text-types";

export interface ISponsor {
  name: string;
  logo:
    | {
        fields: {
          file: {
            url: string;
            details: { image: { width: number; height: number } };
          };
        };
      }
    | string;
  link: string;
  tier: string;
}

export interface ITeamMember {
  name: string;
  role: string;
  avatar:
    | {
        fields: {
          file: {
            url: string;
            details: { image: { width: number; height: number } };
          };
        };
      }
    | string;
  github?: string;
  linkedin?: string;
  lattes?: string;
  fieldWork?: string[];
  institution?: string;
}

export interface ISocialMedia {
  name: string;
  icon: string;
  href: string | undefined;
  size: number;
}

export interface IOCAChannel {
  name: string;
  href: string;
  icon: string;
  size?: number;
}

export interface ISection {
  name: string;
  path?: string;
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
  checked?: boolean;
  measurementUnit: string;
  poster: { fields: { file: { url: string } } } | string;
  minScale?: number;
  maxScale?: number;
  graphLegendTitle?: string;
  imageData: {
    [year: string]: {
      default: boolean;
      imageId: string;
      imageParams: IImageParam[];
    };
  };
  type: string;
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
  type: string;
}

export interface IImageData {
  [year: string]: IImageProps;
}

export interface IImageProps {
  default?: boolean;
  imageId: string;
  pallete?: string[];
}

export interface INews {
  fields: {
    title: string;
    thumb: { fields: { file: { url: string } } };
    url: string;
  };
}

export interface IContactStatus {
  [status: string]: {
    icon: string;
    message: string;
    animation?: string;
  };
}

export interface ISectionHeader {
  fields: {
    id: string;
    title: string;
    subtitle?: string;
  };
}

export interface IFAQ {
  title: string;
  details: Document;
}
