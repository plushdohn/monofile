var withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
});
