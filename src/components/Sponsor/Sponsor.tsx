import { ISponsor } from "@/utils/interfaces";
import { Wrapper, LogoImage } from "./Sponsor.styles";

const Sponsor = ({ data }: { data: ISponsor }) => {
  const { name, logo, link } = data;

  let proportion = 1;
  if (typeof logo === "object") {
    proportion =
      logo?.fields?.file?.details?.image?.height /
      logo?.fields?.file?.details?.image?.width;
  }

  return (
    <Wrapper href={link} target="_blank">
      <LogoImage
        src={`https:${typeof logo === "object" ? logo?.fields?.file?.url : logo}`}
        alt={name}
        title={name}
        width={600}
        height={600 * proportion}
      />
    </Wrapper>
  );
};

export default Sponsor;
