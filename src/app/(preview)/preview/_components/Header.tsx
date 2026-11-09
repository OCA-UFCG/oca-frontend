"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdKeyboardArrowDown, MdMenu, MdClose } from "react-icons/md";
import { BASE, sections } from "@/app/(preview)/preview/_components/constants";
import { ISection } from "@/utils/interfaces";
import {
  Bar,
  Lang,
  LangItem,
  LangMenu,
  LangOption,
  LogoImage,
  MenuButton,
  NavItem,
  NavLink,
  NavList,
  Submenu,
  SubmenuLink,
} from "./Header.styles";

const isActive = (pathname: string, { path, children }: ISection): boolean =>
  (path === BASE ? pathname === BASE : !!path && pathname.startsWith(path)) ||
  Object.values(children ?? {}).some((child) => isActive(pathname, child));

const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Bar $overlay={pathname === BASE}>
      <MenuButton
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <MdClose size={20} /> : <MdMenu size={20} />}
      </MenuButton>

      <Link href={BASE}>
        <LogoImage
          src="/oca_logan.svg"
          alt="OCA"
          width={140}
          height={71}
          priority
        />
      </Link>

      <NavList $open={open}>
        {Object.entries(sections).map(([key, item]) => (
          <NavItem key={key}>
            <NavLink
              href={item.path ?? "#"}
              $active={isActive(pathname, item)}
              aria-current={isActive(pathname, item) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.name}
              {item.children && <MdKeyboardArrowDown size={16} />}
            </NavLink>
            {item.children && (
              <Submenu>
                {Object.entries(item.children).map(([childKey, child]) => (
                  <li key={childKey}>
                    <SubmenuLink
                      href={child.path ?? "#"}
                      onClick={() => setOpen(false)}
                    >
                      {child.name}
                    </SubmenuLink>
                  </li>
                ))}
              </Submenu>
            )}
          </NavItem>
        ))}
        {/* ponytail: só PT por enquanto; EN entra quando chegarem os textos em inglês */}
        <LangItem>
          <Lang type="button" aria-label="Idioma: português">
            PT <MdKeyboardArrowDown size={16} aria-hidden />
          </Lang>
          <LangMenu>
            <li>
              <LangOption type="button" aria-current="true">
                Português
              </LangOption>
            </li>
            <li>
              <LangOption type="button" disabled>
                English (em breve)
              </LangOption>
            </li>
          </LangMenu>
        </LangItem>
      </NavList>
    </Bar>
  );
};

export default Header;
