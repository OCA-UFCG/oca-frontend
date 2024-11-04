import React, { useEffect, useRef } from "react";
import { LoadingIcon } from "../VisuItem/VisuItem.styles";
import {
  TagButton,
  VisuHeader,
  VisuName,
  IconWrapper,
  VisuIcon,
  Divider,
  LinkButton,
  Description,
} from "./TagButtonMaps.styles";

const TagButtonMaps = ({
  tag,
  isLoading,
  isActive,
  onClick,
  currentVisu,
}: {
  tag: { id: string; name: string };
  isLoading: boolean;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currentVisu: { description: string };
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isActive && buttonRef.current) {
      const container = buttonRef.current.parentElement;
      if (container) {
        scrollParentToChild(container, buttonRef.current);
      }
    }
  }, [isActive]);

  const scrollParentToChild = (
    parent: HTMLElement,
    child: HTMLButtonElement,
  ) => {
    const parentRect = parent.getBoundingClientRect();
    const parentViewableArea = parent.clientHeight;
    const childRect = child.getBoundingClientRect();

    const isViewable =
      childRect.top >= parentRect.top &&
      childRect.bottom <= parentRect.top + parentViewableArea;

    if (!isViewable) {
      const scrollTop = childRect.top - parentRect.top;
      const scrollBot = childRect.bottom - parentRect.bottom;

      parent.scrollTo({
        top:
          parent.scrollTop +
          (Math.abs(scrollTop) < Math.abs(scrollBot) ? scrollTop : scrollBot),
        behavior: "smooth",
      });
    }
  };

  return (
    <TagButton ref={buttonRef} active={isActive.toString()} onClick={onClick}>
      <VisuHeader>
        <VisuName active={isActive.toString()}>{tag.name}</VisuName>
        <IconWrapper>
          {isLoading ? (
            <LoadingIcon id={"loading"} size={18} />
          ) : (
            <VisuIcon
              active={isActive.toString()}
              id={isActive ? "open-eye" : "closed-eye"}
              size={20}
            />
          )}
          <Divider />
          <LinkButton
            active={isActive.toString()}
            href={`/map?name=${tag.id}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Visualizar
          </LinkButton>
        </IconWrapper>
      </VisuHeader>
      <Description active={isActive.toString()}>
        {currentVisu.description}
      </Description>
    </TagButton>
  );
};

export default TagButtonMaps;
