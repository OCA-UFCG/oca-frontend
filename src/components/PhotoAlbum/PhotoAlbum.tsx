import { useEffect, useState } from "react";
import { Photo, Wrapper } from "./PhotoAlbum.styles";

// poster: { fields: { file: { url: string } } } | string;

export const PhotoAlbum = ({ photos }: { photos: any[] }) => {
  const [currentPhoto, setCurrentPhoto] = useState(2);
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
      {photos.map((photo, index) => (
        <Photo
          key={index}
          distance={Math.abs(currentPhoto - index)}
          onClick={() => setCurrentPhoto(index)}
          active={(index === currentPhoto).toString()}
          src={`https:${photo.fields.file.url}`}
          height={300}
          width={600}
          alt=""
        />
      ))}
    </Wrapper>
  );
};
