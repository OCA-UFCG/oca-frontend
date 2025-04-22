export const Icon = ({
  id,
  size,
  width,
  height,
  onClick,
  strokeWidth,
  ...props
}: {
  id: string;
  size?: number;
  width?: number;
  height?: number;
  props?: object;
  onClick?: (arg0: any) => void;
  className?: string;
  strokeWidth?: number;
}) => {
  return (
    <svg
      {...props}
      onClick={onClick}
      width={size ? size : width}
      height={size ? size : height}
      className={props.className}
      strokeWidth={strokeWidth}
    >
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};
