"use client";

import { Wrapper } from "./globalStyles";

import Header from "@/components/Header/Header";
import Sponsors from "@/components/Sponsor/Section/Sponsors";
import TeamMembers from "@/components/TeamMember/Section/TeamMembers";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <Wrapper id="root">
      <Header />
      <Sponsors />
      <TeamMembers />
      <Footer />
    </Wrapper>
  );
}
