"use client";

import { FormEvent, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/Redesign/styles";
import { Newsletter } from "./styles";

const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

const STATUS = {
  idle: "",
  sending: "Enviando…",
  sent: "Inscrição enviada. Obrigado!",
  error: "Não foi possível enviar. Tente de novo.",
};

// Inscrição no informativo: manda um e-mail pela mesma rota do formulário de
// Contato (/api/mail, com reCAPTCHA). O reCAPTCHA só carrega quando a pessoa
// começa a preencher, para não pesar a Home de quem só está olhando.
// ponytail: inscrições chegam por e-mail; lista de verdade quando houver serviço de newsletter
const NewsletterForm = () => {
  const [started, setStarted] = useState(false);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<keyof typeof STATUS>("idle");

  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();

    setStatus("sending");
    const response = await fetch(`${HOST_URL}/api/mail`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        message: `Pedido de inscrição no informativo por e-mail do OCA.\n\nNome: ${name}\nE-mail: ${email}`,
        captchaToken: token,
      }),
    }).catch(() => null);

    if (response?.ok) {
      form.reset();
      setToken("");
      setStarted(false);
      setStatus("sent");
    } else {
      setStatus("error");
    }
  };

  return (
    <Newsletter onSubmit={send} onInput={() => setStarted(true)}>
      <input
        type="text"
        name="name"
        placeholder="Digite seu nome"
        aria-label="Nome"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Digite seu melhor e-mail"
        aria-label="E-mail"
        required
      />
      {started && (
        <ReCAPTCHA
          sitekey={RECAPTCHA_SITE_KEY}
          hl="pt-BR"
          onChange={(value) => setToken(value ?? "")}
          onExpired={() => setToken("")}
        />
      )}
      <Button type="submit" disabled={!token || status === "sending"}>
        Inscrever-se
      </Button>
      <span role="status">{STATUS[status]}</span>
    </Newsletter>
  );
};

export default NewsletterForm;
