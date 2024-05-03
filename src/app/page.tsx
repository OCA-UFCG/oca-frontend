"use client";

import Header from "@/components/Header/Header";
import Sponsors from "@/components/Sponsor/Section/Sponsors";

import { Wrapper } from "./globalStyles";

export default function Home() {
  return (
    <Wrapper>
      <Header />
      <Sponsors />
    </Wrapper>
  );
}
