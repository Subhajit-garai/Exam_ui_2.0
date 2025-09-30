import slugify from "slugify";
import { type ClassValue, clsx } from "clsx";
import { type Theme, type ToastOptions, type ToastPosition } from "react-toastify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizedFirstletterOfString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const ToastConfig = (closetime = 2000): ToastOptions => {
  let theme = localStorage.getItem("theme") as
    | "light"
    | "dark"
    | "colored"
    | undefined;

  return {
    position: "top-right" as ToastPosition,
    autoClose: closetime,
    theme: theme || "dark",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };
};

export const sortExamNames = (
  data: any[],
  splitKey: string = "@",
  key: string | undefined = undefined,
  order: string = "asc"
) => {
  if (!Array.isArray(data)) return [];

  return data.sort((a, b) => {
    const valueA: string = key ? a?.[key] : a;
    const valueB: string = key ? b?.[key] : b;

    if (typeof valueA === "string" && typeof valueB === "string") {
      const numA = parseInt(valueA.split(splitKey)[1] as string, 10);
      const numB = parseInt(valueB.split(splitKey)[1] as string, 10);
      switch (order) {
        case "desc":
          return numB - numA;
        case "asc":
          return numA - numB;
        default:
          return numA - numB; // default to ascending order
      }
    }

    return 0; // fallback: keep original order if invalid
  });
};

export const ConvertInSlug = (title: string) => {
  return slugify(title, { lower: true });
};
