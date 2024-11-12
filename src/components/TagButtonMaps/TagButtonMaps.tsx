import React, { useContext, useEffect, useMemo, useRef } from "react";
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
import { MapTiffContext } from "@/contexts/MapContext";

const TagButtonMaps = ({ tag }: { tag: { id: string; name: string } }) => {
  const { tiffs, loading, currentVisu, setCurrentVisu } =
    useContext(MapTiffContext);

  const currentTiff = useMemo(
    () => tiffs.find((tiff) => tiff?.fields.id === tag.id)?.fields,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentVisu.id],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isActive = useMemo(() => tag.id === currentVisu.id, [currentVisu.id]);

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
    <TagButton
      ref={buttonRef}
      active={isActive.toString()}
      onClick={() => setCurrentVisu({ id: currentTiff?.id || "", year: "" })}
    >
      <VisuHeader>
        <VisuName active={isActive.toString()}>{tag.name}</VisuName>
        <IconWrapper>
          {loading ? (
            <LoadingIcon id="loading" size={18} loading={true} />
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
            href={`/map?id=${tag.id}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Visualizar
          </LinkButton>
        </IconWrapper>
      </VisuHeader>
      <Description active={isActive.toString()}>
        {currentTiff?.description}
      </Description>
    </TagButton>
  );
};

export default TagButtonMaps;
