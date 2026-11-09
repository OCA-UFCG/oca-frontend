"use client";

import { FormEvent, useState } from "react";
import { LuArrowRight, LuCalendarDays, LuSearch, LuX } from "react-icons/lu";
import { Heading } from "@/app/(preview)/preview/_components/styles";
import { IPublicationDetails } from "@/utils/publications";
import { Active, Filters, Results } from "./styles";

type Applied = { q: string; type: string; year: string };
const EMPTY: Applied = { q: "", type: "", year: "" };

const matches = (p: IPublicationDetails, { q, type, year }: Applied) =>
  (!type || p.type === type) &&
  (!year || String(p.year) === year) &&
  (!q ||
    [p.title, p.authors, p.journal]
      .join(" ")
      .toLowerCase()
      .includes(q.toLowerCase()));

const Publications = ({ items }: { items: IPublicationDetails[] }) => {
  const [applied, setApplied] = useState<Applied>(EMPTY);
  const types = Array.from(new Set(items.map((p) => p.type))).sort();
  const years = Array.from(new Set(items.map((p) => p.year).filter(Boolean)))
    .sort()
    .reverse();
  const shown = items.filter((p) => matches(p, applied));
  const chips = (Object.keys(applied) as (keyof Applied)[]).filter(
    (k) => applied[k],
  );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setApplied({
      q: String(data.get("q") ?? "").trim(),
      type: String(data.get("type") ?? ""),
      year: String(data.get("year") ?? ""),
    });
  };

  return (
    <>
      <Filters>
        {/* key: limpar um filtro também limpa o campo correspondente */}
        <form onSubmit={submit} key={JSON.stringify(applied)}>
          <input
            name="q"
            type="search"
            placeholder="Buscar por título, autor ou revista"
            aria-label="Buscar publicações"
            defaultValue={applied.q}
          />
          <select
            name="type"
            aria-label="Tipo de pesquisa"
            defaultValue={applied.type}
          >
            <option value="">Tipo de pesquisa</option>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select name="year" aria-label="Ano" defaultValue={applied.year}>
            <option value="">Ano</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
          <button type="submit">Filtrar</button>
        </form>
        {chips.length > 0 && (
          <Active>
            <strong>Filtros ativos:</strong>
            {chips.map((k) => (
              <button
                key={k}
                type="button"
                aria-label={`Remover filtro ${applied[k]}`}
                onClick={() => setApplied({ ...applied, [k]: "" })}
              >
                {applied[k]} <LuX size={12} aria-hidden />
              </button>
            ))}
            <button type="button" onClick={() => setApplied(EMPTY)}>
              Limpar tudo
            </button>
          </Active>
        )}
      </Filters>

      <Results>
        <div>
          <Heading>Publicações</Heading>
          <span aria-live="polite">
            {shown.length} {shown.length === 1 ? "resultado" : "resultados"}
          </span>
        </div>
        <ul>
          {shown.map(({ title, type, href, year, authors, journal }) => (
            <li key={href ?? title}>
              <header>
                <span>{type}</span>
                {year && (
                  <small>
                    <LuCalendarDays size={16} aria-hidden />
                    {year}
                  </small>
                )}
              </header>
              <h3>{title}</h3>
              {authors && <p>{authors}</p>}
              {journal && <p>{journal}</p>}
              {href && (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  Ler <LuArrowRight size={16} aria-hidden />
                </a>
              )}
            </li>
          ))}
        </ul>
        {shown.length === 0 && (
          <p>
            <LuSearch aria-hidden /> Nenhuma publicação com esses filtros.
          </p>
        )}
      </Results>
    </>
  );
};

export default Publications;
