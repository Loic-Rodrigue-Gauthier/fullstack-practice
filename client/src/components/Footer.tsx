import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Footer() {
  return (
    <footer className="border-outline-light dark:border-outline-dark border-t dark:text-white">
      <div className="m-auto flex max-w-334 justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
