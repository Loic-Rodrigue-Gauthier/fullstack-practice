import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="*:aria-[current=page]:text-primary lg:*:aria-[current=page]:bg-primary lg:*:hover:bg-primary-hover lg:*:active:bg-primary-active flex flex-col gap-4.5 text-lg font-medium lg:flex-row lg:gap-2 lg:text-base lg:*:rounded-lg lg:*:px-3.5 lg:*:py-2 lg:*:transition-colors lg:*:hover:text-white lg:*:active:text-white lg:*:aria-[current=page]:text-white">
      <NavLink to="/page1">Navlink</NavLink>
      <NavLink to="/page2">Navlink</NavLink>
      <NavLink to="/page3">Navlink</NavLink>
      <NavLink to="/page4">Navlink</NavLink>
      <NavLink to="/page5">Navlink</NavLink>
    </nav>
  );
}
