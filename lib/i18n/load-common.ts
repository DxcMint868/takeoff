import { serverSideTranslations } from "next-i18next/serverSideTranslations";

/** Namespace JSON trong `public/locales/{locale}/`. */
export async function loadCommonTranslations(locale?: string) {
  return serverSideTranslations(locale ?? "en", ["common"]);
}
