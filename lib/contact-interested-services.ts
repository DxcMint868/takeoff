/** Labels must match Notion multi-select options exactly. */
export const CONTACT_INTERESTED_SERVICE_OPTIONS = [
  { notionName: "Branding", labelKey: "contact.service.branding" },
  {
    notionName: "Software Development",
    labelKey: "contact.service.softwareDevelopment",
  },
  {
    notionName: "Smart Contract Development",
    labelKey: "contact.service.smartContractDevelopment",
  },
  { notionName: "UI / UX Design", labelKey: "contact.service.uiUxDesign" },
  {
    notionName: "Product Management",
    labelKey: "contact.service.productManagement",
  },
  {
    notionName: "Quality Assurance",
    labelKey: "contact.service.qualityAssurance",
  },
] as const;

export const NOTION_INTERESTED_SERVICE_NAMES = new Set(
  CONTACT_INTERESTED_SERVICE_OPTIONS.map((o) => o.notionName) as string[],
);
