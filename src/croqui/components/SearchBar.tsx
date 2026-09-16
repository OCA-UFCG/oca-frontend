"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { theme } from "@/croqui/config/theme";
import { useStore } from "@/croqui/lib/store";
import type { MunicipioFeature, MunicipiosCollection } from "@/croqui/types";

interface SearchBarProps {
  municipios: MunicipiosCollection | null;
}

interface Match {
  feature: MunicipioFeature;
  matchedField: "NM_MUN" | "NM_UF";
  matchedValue: string;
}

function deaccent(s: string) {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function SearchBar({ municipios }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const setSelectedMunCode = useStore((s) => s.setSelectedMunCode);

  // Build a search index lazily once municipios are loaded
  const index = useMemo(() => {
    if (!municipios) return null;

    return municipios.features.map((f) => ({
      feature: f,
      munNorm: deaccent(f.properties.NM_MUN),
      ufNorm: deaccent(f.properties.NM_UF),
    }));
  }, [municipios]);

  const matches: Match[] = useMemo(() => {
    if (!index || query.trim().length < 2) return [];
    const q = deaccent(query.trim());
    const found: Match[] = [];
    for (const item of index) {
      if (item.munNorm.includes(q)) {
        found.push({
          feature: item.feature,
          matchedField: "NM_MUN",
          matchedValue: item.feature.properties.NM_MUN,
        });
      } else if (item.ufNorm.includes(q)) {
        found.push({
          feature: item.feature,
          matchedField: "NM_UF",
          matchedValue: item.feature.properties.NM_UF,
        });
      }
      if (found.length >= 30) break;
    }

    return found;
  }, [index, query]);

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);

    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const selectMatch = (m: Match) => {
    setSelectedMunCode(m.feature.properties.CD_MUN);
    setQuery(`${m.feature.properties.NM_MUN} — ${m.feature.properties.NM_UF}`);
    setOpen(false);
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const m = matches[activeIdx];
      if (m) selectMatch(m);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        width: 320,
        zIndex: 5,
        fontFamily: theme.font.ui,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: theme.colors.panel,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.radius.md,
          padding: "8px 10px",
          boxShadow: theme.shadow.md,
        }}
      >
        <FaSearch size={12} color={theme.colors.textMuted} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIdx(0); // reset highlighted result as the query changes
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Buscar município ou UF…"
          disabled={!municipios}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            width: "100%",
            fontSize: 13,
            color: theme.colors.text,
            fontFamily: theme.font.ui,
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedMunCode(null);
              inputRef.current?.focus();
            }}
            className="ui-press"
            style={{
              background: "transparent",
              border: "none",
              padding: 2,
              color: theme.colors.textFaint,
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Limpar"
          >
            <FaTimes size={12} />
          </button>
        )}
      </div>

      {open && matches.length > 0 && (
        <div
          className="fade-in"
          style={{
            marginTop: 4,
            background: theme.colors.panel,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radius.md,
            boxShadow: theme.shadow.md,
            maxHeight: 320,
            overflowY: "auto",
          }}
        >
          {matches.map((m, i) => {
            const isActive = i === activeIdx;

            return (
              <button
                key={`${m.feature.properties.CD_MUN}-${m.matchedField}`}
                type="button"
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => selectMatch(m)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                  padding: "8px 12px",
                  border: "none",
                  background: isActive
                    ? theme.colors.panelMuted
                    : "transparent",
                  borderBottom: `1px solid ${theme.colors.border}`,
                  textAlign: "left",
                  fontSize: 13,
                  color: theme.colors.text,
                  cursor: "pointer",
                  fontFamily: theme.font.ui,
                }}
              >
                <span style={{ fontWeight: 500 }}>
                  {m.feature.properties.NM_MUN}
                </span>
                <span style={{ fontSize: 11, color: theme.colors.textMuted }}>
                  {m.feature.properties.NM_UF} ·{" "}
                  {m.feature.properties.NM_REGIAO}
                </span>
              </button>
            );
          })}
        </div>
      )}
      {open && query.trim().length >= 2 && matches.length === 0 && (
        <div
          style={{
            marginTop: 4,
            padding: "10px 12px",
            background: theme.colors.panel,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radius.md,
            color: theme.colors.textMuted,
            fontSize: 12,
            fontFamily: theme.font.ui,
          }}
        >
          Nenhum município encontrado.
        </div>
      )}
    </div>
  );
}
