"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { MOBILE } from "./styles";

// Faixa com rolagem horizontal nativa (scroll-snap) + indicador de página e setas.
// O filho é a lista (Cards ou PartnerLogos); o CSS abaixo a põe em uma linha só.
export default function Carousel({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const total = Math.max(
        1,
        Math.ceil(el.scrollWidth / el.clientWidth - 0.05),
      );
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      setPages(total);
      setPage(atEnd ? total - 1 : Math.round(el.scrollLeft / el.clientWidth));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: number) =>
    track.current?.scrollBy({
      left: dir * track.current.clientWidth * 0.9,
      behavior: "smooth",
    });

  return (
    <section aria-label={label}>
      <Track ref={track}>{children}</Track>
      {pages > 1 && (
        <Controls>
          <Dots aria-hidden>
            {Array.from({ length: pages }, (_, i) => (
              <span key={i} data-active={i === page || undefined} />
            ))}
          </Dots>
          <div>
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={page === 0}
              aria-label="Anterior"
            >
              <LuArrowLeft size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={page === pages - 1}
              aria-label="Próximo"
            >
              <LuArrowRight size={16} aria-hidden />
            </button>
          </div>
        </Controls>
      )}
    </section>
  );
}

const Track = styled.div`
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    display: none;
  }

  > ul {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: 382px;
    flex-wrap: nowrap;
    overflow: visible;
  }

  > ul > li {
    flex-shrink: 0;
    scroll-snap-align: start;
  }

  @media (${MOBILE}) {
    > ul {
      grid-auto-columns: min(300px, 80%);
    }
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;

  > div {
    display: flex;
    gap: 8px;
  }

  button {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors["text-primary"]};
    cursor: pointer;
  }

  button:disabled {
    color: ${({ theme }) => theme.colors.border};
    cursor: default;
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 6px;

  span {
    width: 8px;
    height: 3px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors["text-primary"]};
    transition: width 0.2s;
  }

  span[data-active] {
    width: 24px;
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;
