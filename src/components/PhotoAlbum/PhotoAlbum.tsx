import { useEffect, useState } from "react";
import {
  ActivePhoto,
  Thumbnail,
  ThumbnailList,
  Wrapper,
} from "./PhotoAlbum.styles";

// poster: { fields: { file: { url: string } } } | string;

export const PhotoAlbum = ({ photos }: { photos: any[] }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  let handler: NodeJS.Timeout;

  const newsDebounce = () => {
    handler = setTimeout(() => {
      const next = currentPhoto === photos.length - 1 ? 0 : currentPhoto + 1;
      setCurrentPhoto(next);
    }, 5000);
  };

  useEffect(() => {
    if (photos.length > 1) {
      newsDebounce();
    }

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPhoto]);

  return (
    <Wrapper>
      <ActivePhoto
        src={`${photos[currentPhoto].url}?&w=624&h=448`}
        height={448}
        width={624}
        alt=""
        quality={100}
        priority
      />
      <ThumbnailList>
        {photos.map((photo, index) => (
          <Thumbnail
            key={index}
            onClick={() => setCurrentPhoto(index)}
            $active={(index === currentPhoto).toString()}
            src={`${photo.url}?&w=180&h=120`}
            height={120}
            width={180}
            alt=""
            quality={40}
          />
        ))}
      </ThumbnailList>
    </Wrapper>
  );
};
