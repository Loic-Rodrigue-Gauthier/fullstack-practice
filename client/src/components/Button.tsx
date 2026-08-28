import type { ElementType } from "react";

const colors = {
  primary: `
    text-white
    bg-primary
    hover:bg-primary-hover
    hover:text-black
    active:bg-primary-active
    active:text-white
  `,
  secondary: `
    text-white
    bg-secondary
    hover:bg-secondary-hover
    hover:text-black
    active:bg-secondary-active
    active:text-white
  `,
};

type ButtonProps<T extends ElementType> = {
  children: React.ReactNode;
  as?: T;
  color?: keyof typeof colors;
  width?: string;
  paddingX?: string;
  paddingY?: string;
} & React.ComponentPropsWithoutRef<T>; // auto-types any other element-specific props used

export default function Button<T extends ElementType = "button">({
  children,
  as,
  color = "primary",
  width = "w-fit",
  paddingX = "px-3.5",
  paddingY = "py-2",
  className = "",
  ...props
}: ButtonProps<T>) {
  const Component = as ?? "button";

  return (
    <Component
      // adding "transition-..." without any options does a preset animation (ease-out, 150ms) between two states (A -> B)
      className={`${colors[color]} ${width} ${paddingX} ${paddingY} ${className} cursor-pointer rounded-lg text-center font-semibold transition-colors select-none`}
      {...props}
    >
      {children}
    </Component>
  );
}
