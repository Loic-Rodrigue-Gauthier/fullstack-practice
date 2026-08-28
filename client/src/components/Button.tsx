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

type ButtonProps = {
  children: React.ReactNode;
  variant?: keyof typeof variants;
} & React.ComponentProps<"button">;

export default function Button({ children, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={`disabled:bg-disabled-surface disabled:text-disabled-content w-fit cursor-pointer rounded-lg px-3.5 py-2 font-medium transition-colors select-none disabled:cursor-not-allowed ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
