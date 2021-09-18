import React from "react";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

import { getStrippedTitle, getArticleLink } from "../../utils/helper";

const NewsItemSmall = ({ newsItem, placeholder }) => {
  const router = useRouter();

  if (placeholder) {
    return (
      <div className="news-item-small">
        <section style={{ width: "100%" }}>
          <Skeleton width="100%" height={120} />
        </section>
      </div>
    );
  }

  return (
    <div
      className="news-item-small"
      onClick={() => router.push(getArticleLink(newsItem))}
    >
      <div className="left">
        <img
          src={newsItem.image_backup || newsItem.image}
          alt={newsItem.title}
        />
      </div>
      <div className="right">
        <h1>{getStrippedTitle(newsItem)}</h1>
        <p className="mt-2" style={{ color: "grey" }}>
          <strong className={`color-${newsItem.topic?.toLowerCase()} mr-2`}>
            {newsItem.topic?.toUpperCase()}
          </strong>
          |<i className="fa fa-clock-o mx-2" aria-hidden="true"></i>
          {newsItem.age?.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default NewsItemSmall;
