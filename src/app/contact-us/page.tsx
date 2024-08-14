"use client";

import Template from "@/templates/hubTemplate";
import {
  ContactUsContainer,
  SubTitle,
  FormularyWrapper,
  FormularyLabel,
  FormularyInput,
  FormularyTextArea,
  SendInput,
} from "./styles";
import { SectionTitle } from "../globalStyles";
import { FormEvent } from "react";

const ContactUsPage = () => {
  const sendEmail = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    await fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify(data),
    });
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
        <FormularyWrapper onSubmit={sendEmail}>
          <FormularyLabel>
            Nome:
            <FormularyInput type="text" id="name" name="name" />
          </FormularyLabel>
          <FormularyLabel>
            Email:
            <FormularyInput type="email" id="email" name="email" />
          </FormularyLabel>
          <FormularyLabel>
            Mensagem:
            <FormularyTextArea id="message" name="message" />
          </FormularyLabel>
          <SendInput type="submit" value="Enviar" />
        </FormularyWrapper>
      </ContactUsContainer>
    </Template>
  );
};

export default ContactUsPage;
