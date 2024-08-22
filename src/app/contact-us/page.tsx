"use client";

import Template from "@/templates/hubTemplate";
import {
  ContactUsContainer,
  SubTitle,
  FormularyWrapper,
  FormularyLabel,
  FormularyInput,
  FormularyTextArea,
  DinamicButton,
  Icon,
  TextInButton,
} from "./styles";
import { SectionTitle } from "../globalStyles";
import { FormEvent, useState } from "react";
import { contactStatus } from "@/utils/constants";

const ContactUsPage = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendStatus, setSendStatus] = useState<
    "success" | "error" | "loading" | "default"
  >("default");

  const validateForm = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const isValid =
      name.trim() != "" && email.trim() != "" && message.trim() != "";
    setIsFormValid(isValid);
  };

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

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
    };

    const response = await fetch("/api/mail", {
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
    <Template>
      <ContactUsContainer>
        <SectionTitle>Fale Conosco</SectionTitle>
        <SubTitle>
          Preencha esse formulário abaixo e te responderemos o mais rápido
          possível. Caso queira, você também pode nos mandar mensagem pelas
          nossas redes sociais.
        </SubTitle>
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
          <DinamicButton
            isFormValid={isFormValid}
            className={sendStatus || "default"}
            type="submit"
            disabled={!isFormValid || isLoading}
          >
            <TextInButton>{contactStatus[sendStatus].message}</TextInButton>
            <Icon
              className={contactStatus[sendStatus].animation || ""}
              id={contactStatus[sendStatus].icon}
              size={19}
            />
          </DinamicButton>
        </FormularyWrapper>
      </ContactUsContainer>
    </Template>
  );
};

export default ContactUsPage;
