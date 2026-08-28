import { Link, type LinkProps } from "react-router-dom";

const variants = {
  primary: `
    text-white
    bg-primary
    hover:bg-primary-hover
    active:bg-primary-active
  `,
  secondary: `
    text-white
    bg-secondary
    hover:bg-secondary-hover
    active:bg-secondary-active
  `,
};

type LinkButtonProps = {
  children: React.ReactNode;
  variant?: keyof typeof variants;
} & LinkProps;

export default function LinkButton({ children, variant = "primary", ...props }: LinkButtonProps) {
  return (
    <Link
      className={`rounded-lg px-3.5 py-2 font-medium transition-colors ${variants[variant]}`}
      {...props}
    >
      {children}
    </Link>
  );
}
