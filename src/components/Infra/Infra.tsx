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
import { IGallery } from "@/utils/interfaces";

const InfraSection = ({ gallery }: { gallery: IGallery[] }) => {
  return (
    <Section $full={"false"} id="publications">
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
              data-lg-size={`${photo.image.width}-${photo.image.height}`}
              className="gallery__item"
              data-src={photo.image.url}
              data-sub-html={`<h2 style=\"color: white\">${photo.title}</h2><p style=\"color: white; text-align: center\"><strong>Descrição: </strong>${photo.description}</p>`}
            >
              <ImageContainer>
                <InfoContainer>
                  <Title>{photo.title}</Title>
                  <Subtitle>{photo.description}</Subtitle>
                </InfoContainer>
                <Image
                  alt={photo.description}
                  height={photo.image.height}
                  width={photo.image.width}
                  src={photo.image.url}
                  unoptimized={true}
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
