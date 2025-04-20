"use client";

import {
  FormularyWrapper,
  FormularyLabel,
  FormularyInput,
  FormularyTextArea,
  DinamicButton,
  Icon,
  TextInButton,
} from "./ContactForm.styles";
import { FormEvent, useRef, useState } from "react";
import { contactStatus } from "@/utils/constants";
import ReCAPTCHA from "react-google-recaptcha";

const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

const ContactForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [token, setToken] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendStatus, setSendStatus] = useState<
    "success" | "error" | "loading" | "default"
  >("default");

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const validateForm = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const isValid =
      name.trim() != "" && email.trim() != "" && message.trim() != "";
    setIsFormValid(isValid);
  };

  const sendEmail = async (event: FormEvent) => {
    setIsLoading(true);
    setSendStatus("loading");

    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      captchaToken: token,
    };

    const response = await fetch(`${HOST_URL}/api/mail`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    setIsLoading(false);

    if (response.ok) {
      setSendStatus("success");
      sleep(4000).then(() => setSendStatus("default"));
      form.reset();
      setIsFormValid(false);
    } else {
      setSendStatus("error");
    }
  };

  return (
    <FormularyWrapper
      onSubmit={sendEmail}
      onInput={(e) => validateForm(e.currentTarget)}
    >
      <FormularyLabel>
        Nome:
        <FormularyInput type="text" id="name" name="name" required />
      </FormularyLabel>
      <FormularyLabel>
        Email:
        <FormularyInput type="email" id="email" name="email" required />
      </FormularyLabel>
      <FormularyLabel>
        Mensagem:
        <FormularyTextArea id="message" name="message" required />
      </FormularyLabel>
      <ReCAPTCHA
        sitekey={RECAPTCHA_SITE_KEY}
        ref={recaptchaRef}
        onChange={(token) => token && setToken(token)}
        onExpired={() => setToken("")}
      />
      <DinamicButton
        type="submit"
        className={sendStatus || "default"}
        isFormValid={isFormValid && !!token}
        disabled={!isFormValid || !token || isLoading}
      >
        <TextInButton>{contactStatus[sendStatus].message}</TextInButton>
        <Icon
          className={contactStatus[sendStatus].animation || ""}
          id={contactStatus[sendStatus].icon}
          size={19}
        />
      </DinamicButton>
    </FormularyWrapper>
  );
};

export default ContactForm;
