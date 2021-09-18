module.exports = {
  siteUrl: "https://nigeriastack.com/",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://nigeriastack.com/server-sitemap.xml"],
  },
};
