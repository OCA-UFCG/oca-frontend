import { ISponsor } from "@/utils/interfaces";
import { Wrapper, LogoImage } from "./Sponsor.styles";

const Sponsor = ({ data }: { data: ISponsor }) => {
  const { name, logo, link } = data;

  console.log(logo);

  return (
    <Wrapper href={link} target="_blank">
      <LogoImage
        src={`https:${typeof logo === "object" ? logo?.fields?.file?.url : logo}`}
        alt={name}
        title={name}
        width={
          typeof logo === "object"
            ? logo?.fields?.file?.details?.image?.width
            : 125
        }
        height={
          typeof logo === "object" ? logo.fields.file.details.image.width : 125
        }
      />
    </Wrapper>
  );
};

export default Sponsor;
