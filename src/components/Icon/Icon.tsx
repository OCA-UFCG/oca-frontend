export const Icon = ({
  id,
  size,
  width,
  height,
  ...props
}: {
  id: string;
  size?: number;
  width?: number;
  height?: number;
  props?: object;
}) => {
  return (
    <svg {...props} width={size ? size : width} height={size ? size : height}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};
