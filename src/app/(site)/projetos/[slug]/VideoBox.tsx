"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { LuPlay, LuX } from "react-icons/lu";
import { PlayButton, VideoDialog } from "./styles";

// O box só tem a capa (não carrega nada do YouTube até o clique);
// o player abre grande, onde a qualidade escolhida pelo YouTube é melhor.
export default function VideoBox({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <PlayButton
        type="button"
        aria-label={`Assistir: ${title}`}
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        <Image
          src={poster}
          alt=""
          fill
          sizes="(max-width: 1000px) 100vw, 640px"
        />
        <LuPlay size={36} aria-hidden />
      </PlayButton>

      <VideoDialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => dialog.current?.close()}
        >
          <LuX size={24} aria-hidden />
        </button>
        {/* só monta o iframe aberto: fechar para o áudio */}
        {open && (
          <iframe
            src={src}
            title={title}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </VideoDialog>
    </>
  );
}
