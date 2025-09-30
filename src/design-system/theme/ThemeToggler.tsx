import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";

export const useTheme = (allthemes: string[]) => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    // Detect system preference
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    return systemPreference;
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const rootElement = document.querySelector("html");
    if (!rootElement) return;

    // Remove the old theme class
    rootElement.classList.remove(...allthemes);

    // Add the new theme class
    rootElement.classList.add(theme);

    // Save the theme to localStorage
    localStorage.setItem("theme", theme);
    // setReduxTheme(theme)
  }, [theme]); // Run this effect when `theme` changes

  return { theme, setTheme };
};

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme(["light", "dark"]); // set first to light

  const switchTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("light"); // set  light
        break;
      default:
        break;
    }
  };

  const toggleTheme = () => {
    switchTheme();
  };

  return (
    <Button
      variant={"default"}
      className="text-primary-foreground "
      onClick={toggleTheme}
    >
      {theme == "dark" ? (
        <Moon className=" size-6 rotate-90 scale-0  transition-all group-hover:text-blue-500 dark:rotate-0 dark:scale-100 " />
      ) : (
        <Sun className="size-6 rotate-0 scale-100  transition-all group-hover:text-blue-500 dark:-rotate-90 dark:scale-0" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
