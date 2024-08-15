"use client";

import Template from "@/templates/hubTemplate";
import {
  ContactUsContainer,
  SubTitle,
  FormularyWrapper,
  FormularyLabel,
  FormularyInput,
  FormularyTextArea,
  SendButton,
  InvalidForm,
  Icon,
  TextInButton,
  LoadingIcon,
} from "./styles";
import { SectionTitle } from "../globalStyles";
import { FormEvent, useState } from "react";

const ContactUsPage = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const isValid = name != "" && email != "" && message != "";
    setIsFormValid(isValid);
  };

  const sendEmail = async (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    await fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify(data),
    });

    form.reset();
    validateForm(form);
    setIsLoading(false);
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
          {isFormValid && !isLoading ? (
            <SendButton type="submit">
              <TextInButton>Enviar</TextInButton>
              <Icon id="send" size={17} />
            </SendButton>
          ) : (
            <InvalidForm type="submit" disabled>
              <TextInButton>Enviar</TextInButton>
              {isLoading ? (
                <LoadingIcon id="loading" size={17} />
              ) : (
                <Icon id="send" size={17} />
              )}
            </InvalidForm>
          )}
        </FormularyWrapper>
      </ContactUsContainer>
    </Template>
  );
};

export default ContactUsPage;
