import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

function isSupportedLocale(locale: string): locale is (typeof routing.locales)[number] {
  return routing.locales.includes(locale as any);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = (await requestLocale)?.split("-")[0] ?? "";
  const locale = isSupportedLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
