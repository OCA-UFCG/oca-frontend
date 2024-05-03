"use client";

import Header from "@/components/Header/Header";
import { Wrapper } from "./globalStyles";
import MenuModal from "@/components/MenuModal/MenuModal";

export default function Home() {


  return (
    <Wrapper>
      <Header />
      <MenuModal>
        <h1>OCA</h1>
      </MenuModal>

    </Wrapper>
  );
}
