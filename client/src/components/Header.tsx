import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ApiError from "../errors/ApiError";
import { signout } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import Navbar from "./Navbar";
import LinkButton from "./LinkButton";
import logo from "../assets/react.svg";
import profilePicture from "../assets/hero.png";

export default function Header() {
  const { user, refreshUser } = useAuth();

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const emailLocal = user?.email.slice(0, user.email.indexOf("@"));

  useEffect(() => {
    if (!isUserMenuOpen && !isMobileMenuOpen) {
      return;
    }

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;

      const clickedMobileMenu = mobileMenuRef.current?.contains(target);
      const clickedUserMenu = userMenuRef.current?.contains(target);

      if (!clickedMobileMenu) {
        setIsMobileMenuOpen(false);
      }

      if (!clickedUserMenu) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isUserMenuOpen, isMobileMenuOpen]);

  const handleSignout = async () => {
    try {
      await signout();
      await refreshUser();
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);
      }
    }
  };

  return (
    <header className="border-primary-light sticky top-0 flex h-18 items-center justify-between border-b bg-white px-6 dark:bg-black dark:text-white">
      <div ref={mobileMenuRef} className="lg:hidden">
        <button type="button" onClick={() => setIsMobileMenuOpen((prev) => !prev)} className="flex">
          <span className="material-symbols-rounded">{isMobileMenuOpen ? "close" : "menu"}</span>
        </button>

        <div
          className={`${isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"} absolute top-18 left-0 h-screen w-screen bg-white p-6 transition-opacity dark:bg-black`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Navbar />

          {!user && (
            <div className="mt-8.5 md:hidden">
              <LinkButton variant="secondary" to="/auth" state={{ mode: "signup" }}>
                Sign up
              </LinkButton>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-9 w-auto" />
          <span className="font-lexend hidden text-xl md:block">Appname</span>
        </Link>
        <div className="hidden lg:block">
          <Navbar />
        </div>
      </div>

      {user && (
        <div ref={userMenuRef}>
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="hover:bg-primary-hover md:active:bg-primary-active cursor-pointer rounded-full p-1 transition-colors"
          >
            <img
              src={profilePicture}
              alt="profile picture"
              className="h-9 w-9 rounded-full bg-white"
            />
          </button>

          <div
            className={`${isUserMenuOpen ? "visible opacity-100" : "invisible opacity-0"} absolute top-18 right-0 flex flex-col gap-4 rounded-sm bg-white px-7.5 py-6 shadow-[0_0_5px_0] shadow-black transition-opacity dark:bg-black dark:shadow-white`}
          >
            <nav onClick={() => setIsUserMenuOpen(false)}>
              <Link
                to={`/profile/${emailLocal}`}
                className="hover:text-primary-hover active:text-primary-active flex gap-1.5 transition-colors"
              >
                <span className="material-symbols-rounded">account_circle</span>Profile
              </Link>
            </nav>
            <button
              type="button"
              onClick={handleSignout}
              className="hover:text-secondary-hover active:text-secondary-active flex cursor-pointer gap-1.5 transition-colors"
            >
              <span className="material-symbols-rounded">logout</span>Sign out
            </button>
          </div>
        </div>
      )}

      {!user && (
        <div className="flex gap-2 text-sm">
          <LinkButton to="/auth" state={{ mode: "signin" }}>
            Sign in
          </LinkButton>
          <div className="hidden md:flex">
            <LinkButton variant="secondary" to="/auth" state={{ mode: "signup" }}>
              Sign up
            </LinkButton>
          </div>
        </div>
      )}
    </header>
  );
}
