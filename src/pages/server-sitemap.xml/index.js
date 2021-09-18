import axios from "axios";
import { getServerSideSitemap } from "next-sitemap";
import { getArticleLink } from "../../utils/helper";

export const getServerSideProps = async (ctx) => {
  const { data } = await axios(
    "https://api.newsservice.nigeriastack.com/api/article/home/?format=json"
  );

  const articles = data.map((item) => {
    const pathname = getArticleLink(item);

    return {
      loc: `https://nigeriastack.com${pathname}`,
      lastmod: new Date().toISOString(),
    };
  });

  const pages = [
    {
      loc: "https://nigeriastack.com/topic/trending",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://nigeriastack.com/topic/news",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://nigeriastack.com/topic/sports",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://nigeriastack.com/topic/technology",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://nigeriastack.com/topic/music",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://nigeriastack.com/topic/business",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://nigeriastack.com/topic/opinion",
      lastmod: new Date().toISOString(),
    },
  ];

  return getServerSideSitemap(ctx, [...pages, ...articles]);
};

// Default export to prevent next.js errors
export default () => {};
