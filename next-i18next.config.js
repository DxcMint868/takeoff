const path = require("path");

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja", "vi", "ko"],
  },
  localePath: path.resolve("./public/locales"),
  defaultNS: "common",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
