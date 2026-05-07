import type { TFunction } from "next-i18next";

/** Khớp nhãn tiếng Anh trên tag dự án — chỉ đổi hiển thị, logic lọc vẫn dùng nhãn gốc. */
const EN_LABEL_TO_FILTER_KEY: Record<string, string> = {
  "Smart Contract Development": "smartContractDevelopment",
  Research: "research",
  Development: "development",
  Branding: "branding",
  Product: "product",
  "UX/UI": "uxUi",
  "Data Infrastructure": "dataInfrastructure",
  "Compliance Controls": "complianceControls",
  "Graphics/Animation": "graphicsAnimation",
};

export function translateWorkFilterChipLabel(
  englishLabel: string,
  t: TFunction,
): string {
  const k = EN_LABEL_TO_FILTER_KEY[englishLabel];
  if (!k) return englishLabel;
  return t(`worksPage.filters.${k}`);
}
