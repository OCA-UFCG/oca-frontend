"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaTimes, FaFilePdf, FaSpinner } from "react-icons/fa";
import { theme } from "@/croqui/config/theme";
import { useStore } from "@/croqui/lib/store";
import { exportCroquiPdf } from "@/croqui/lib/exportPdf";
import { saveCroquiExport, buildExportPayload, type ExportMeta } from "@/croqui/lib/saveExport";
import { loadRecaptcha } from "@/croqui/lib/recaptcha";
import { RECAPTCHA_SITE_KEY } from "@/croqui/config/exportSink";

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
}

export function ExportModal({ open, onClose }: ExportModalProps) {
  const results = useStore((s) => s.results);
  const drawnFeatures = useStore((s) => s.drawnFeatures);

  const [nome, setNome] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [email, setEmail] = useState("");
  const [obs, setObs] = useState("");
  const [busy, setBusy] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  // Render the reCAPTCHA checkbox while the modal is open (if a Site Key is set).
  useEffect(() => {
    if (!open || !RECAPTCHA_SITE_KEY) return;
    let cancelled = false;
    loadRecaptcha()
      .then((g) => {
        if (cancelled || !recaptchaRef.current || widgetIdRef.current !== null) return;
        widgetIdRef.current = g.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          callback: (t: string) => setCaptchaToken(t),
          "expired-callback": () => setCaptchaToken(null),
          "error-callback": () => setCaptchaToken(null),
        });
      })
      .catch(() => {
        /* failed to load — submit stays blocked; check the console */
      });
    return () => {
      cancelled = true;
      widgetIdRef.current = null;
      setCaptchaToken(null);
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  const captchaOk = !RECAPTCHA_SITE_KEY || !!captchaToken;
  const canSubmit =
    nome.trim().length > 0 &&
    !!results &&
    drawnFeatures.length > 0 &&
    !busy &&
    captchaOk;

  const onSubmit = async () => {
    if (!results || drawnFeatures.length === 0) return;
    const meta: ExportMeta = {
      nome: nome.trim(),
      instituicao: instituicao.trim(),
      email: email.trim(),
      observacoes: obs.trim(),
    };
    setBusy(true);
    try {
      await exportCroquiPdf({ results, drawnFeatures, meta });
      // Fire-and-forget: register on the spreadsheet without blocking the PDF.
      void saveCroquiExport({
        ...buildExportPayload(results, drawnFeatures, meta),
        recaptcha: captchaToken ?? "",
      });
      onClose();
    } catch (err) {
      console.error("Croqui export failed", err);
      alert("Erro ao gerar o relatório — veja o console.");
    } finally {
      setBusy(false);
    }
  };

  return createPortal(
    <div
      onMouseDown={busy ? undefined : onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(40,40,30,0.35)",
        display: "grid",
        placeItems: "center",
        zIndex: 50,
        fontFamily: theme.font.ui,
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="fade-in"
        style={{
          width: 420,
          maxWidth: "92vw",
          background: theme.colors.panel,
          borderRadius: theme.radius.lg,
          boxShadow: theme.shadow.lg,
          overflow: "hidden",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            borderBottom: `1px solid ${theme.colors.border}`,
            background: theme.colors.panelMuted,
          }}
        >
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: theme.colors.sageDark }}>
            Exportar relatório
          </h3>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="ui-press"
            aria-label="Fechar"
            style={{ background: "none", border: "none", color: theme.colors.textMuted, cursor: "pointer", padding: 4 }}
          >
            <FaTimes size={14} />
          </button>
        </header>

        <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
          <Field label="Nome" required>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              autoFocus
              style={inputStyle}
            />
          </Field>
          <Field label="Instituição">
            <input
              value={instituicao}
              onChange={(e) => setInstituicao(e.target.value)}
              placeholder="Universidade, órgão, projeto…"
              style={inputStyle}
            />
          </Field>
          <Field label="E-mail">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="opcional"
              style={inputStyle}
            />
          </Field>
          <Field label="Observações">
            <textarea
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              placeholder="Finalidade do croqui, notas… (opcional)"
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </Field>

          {RECAPTCHA_SITE_KEY && (
            <div
              ref={recaptchaRef}
              style={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            />
          )}

          <p style={{ margin: "2px 0 0", fontSize: 11, color: theme.colors.textFaint, lineHeight: 1.5 }}>
            Ao gerar, o PDF é baixado e as coordenadas do croqui podem ser
            registradas para fins de pesquisa do Observatório.
          </p>
        </div>

        <footer
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            padding: "12px 18px",
            borderTop: `1px solid ${theme.colors.border}`,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="ui-press"
            style={{
              padding: "9px 14px",
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.md,
              background: theme.colors.panel,
              color: theme.colors.textMuted,
              fontSize: 13,
              fontFamily: theme.font.ui,
              cursor: busy ? "not-allowed" : "pointer",
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            className="ui-press"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 16px",
              border: "none",
              borderRadius: theme.radius.md,
              background: canSubmit ? theme.colors.sage : theme.colors.borderStrong,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: theme.font.ui,
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
          >
            {busy ? (
              <>
                <FaSpinner size={12} style={{ animation: "spin 1s linear infinite" }} />
                Gerando…
              </>
            ) : (
              <>
                <FaFilePdf size={12} />
                Gerar relatório
              </>
            )}
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radius.md,
  fontSize: 13,
  fontFamily: theme.font.ui,
  color: theme.colors.text,
  outline: "none",
  boxSizing: "border-box",
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 12, fontWeight: 500, color: theme.colors.textMuted }}>
        {label}
        {required && <span style={{ color: theme.colors.danger }}> *</span>}
      </span>
      {children}
    </label>
  );
}
