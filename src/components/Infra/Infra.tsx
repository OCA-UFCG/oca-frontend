"use client";
import { Section } from "@/app/globalStyles";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// If you want you can use SCSS instead of css
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import {
  Gallery,
  Image,
  ImageContainer,
  ImageLink,
  Subtitle,
  InfoContainer,
  Title,
} from "./Infra.styles";

const InfraSection = ({
  gallery,
}: {
  gallery: {
    fields: {
      title: string;
      description: string;
      image: {
        fields: {
          file: {
            url: string;
            details: { image: { height: number; width: number } };
          };
        };
      };
    };
  }[];
}) => {
  return (
    <Section full={"false"} id="publications">
      <Gallery>
        <LightGallery
          mode="lg-fade"
          pager={false}
          thumbnail={true}
          galleryId={"infrastructure"}
          autoplayFirstVideo={false}
          mobileSettings={{
            controls: false,
            showCloseIcon: false,
            download: false,
            rotate: false,
          }}
          speed={500}
          elementClassNames="gallery"
          plugins={[lgThumbnail, lgZoom]}
        >
          {gallery.map((photo, index) => (
            <ImageLink
              key={index}
              data-lg-size={`${photo.fields.image.fields.file.details.image.width}-${photo.fields.image.fields.file.details.image.height}`}
              className="gallery__item"
              data-src={`https:${photo.fields.image.fields.file.url}`}
              data-sub-html={`<h2 style=\"color: white\">${photo.fields.title}</h2><p style=\"color: white; text-align: center\"><strong>Descrição: </strong>${photo.fields.description}</p>`}
            >
              <ImageContainer>
                <InfoContainer>
                  <Title>{photo.fields.title}</Title>
                  <Subtitle>{photo.fields.description}</Subtitle>
                </InfoContainer>
                <Image
                  alt={photo.fields.description}
                  height={photo.fields.image.fields.file.details.image.height}
                  width={photo.fields.image.fields.file.details.image.width}
                  src={`https:${photo.fields.image.fields.file.url}`}
                />
              </ImageContainer>
            </ImageLink>
          ))}
        </LightGallery>
      </Gallery>
    </Section>
  );
};

export default InfraSection;
