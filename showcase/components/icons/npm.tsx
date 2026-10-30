export interface NpmIconProps {
  className?: string;
  size?: number | string;
  color?: string;
}

export const NpmIcon = ({
  className,
  size,
  color = "currentColor",
}: NpmIconProps) => (
  <svg
    viewBox="0 0 2500 2500"
    width={size}
    height={size}
    className={className}
    fill={color}
    aria-hidden="true"
  >
    <path d="M1241.5 268.5h-973v1962.9h972.9V763.5h495v1467.9h495V268.5z" />
  </svg>
);

export default NpmIcon;
