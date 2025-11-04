import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

function isSupportedLocale(locale: string): locale is (typeof routing.locales)[number] {
  return routing.locales.includes(locale as "lv" | "en" | "ru");
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = (await requestLocale)?.split("-")[0] ?? "";
  const locale = isSupportedLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: {},
  };
});
