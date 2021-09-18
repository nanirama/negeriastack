import React from "react";
import { useRouter } from "next/router";

import { getStrippedTitle, getArticleLink } from "../../utils/helper";

const NewsItemArticleSidebar = ({ newsItem }) => {
  const router = useRouter();

  return (
    <div
      className="news-item-article-sidebar"
      onClick={() => router.push(getArticleLink(newsItem))}
    >
      <div className="top">
        <img
          src={newsItem.image_backup || newsItem.image}
          alt={newsItem.title}
        />
      </div>
      <div className="bottom">
        <h1 className="mt-2">{getStrippedTitle(newsItem)}</h1>
      </div>
    </div>
  );
};

export default NewsItemArticleSidebar;
