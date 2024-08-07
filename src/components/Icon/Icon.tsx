export const Icon = ({
  id,
  size,
  width,
  height,
  onClick,
  ...props
}: {
  id: string;
  size?: number;
  width?: number;
  height?: number;
  props?: object;
  onClick?: (arg0: any) => void;
}) => {
  return (
    <svg
      {...props}
      onClick={onClick}
      width={size ? size : width}
      height={size ? size : height}
    >
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};
