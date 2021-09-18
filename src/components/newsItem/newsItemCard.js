import React from "react";
import { useRouter } from "next/router";

import { getStrippedTitle, getArticleLink } from "../../utils/helper";

const NewsItemCard = ({ newsItem }) => {
  const router = useRouter();

  return (
    <div
      className="news-item-card"
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
        <p>
          <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
          {newsItem.age && newsItem.age.toUpperCase() + " AGO"}
        </p>
      </div>
    </div>
  );
};

export default NewsItemCard;
