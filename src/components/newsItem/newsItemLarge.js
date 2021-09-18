import React from "react";
import { useRouter } from "next/router";
import { getArticleLink, getStrippedTitle } from "../../utils/helper";

const NewsItemLarge = ({ newsItem }) => {
  const router = useRouter();

  return (
    <div
      className="news-item-large"
      onClick={() => router.push(getArticleLink(newsItem))}
      style={{
        backgroundImage: `url('${newsItem.image_backup || newsItem.image}')`,
      }}
    >
      <div className="inner">
        <h1>{getStrippedTitle(newsItem)}</h1>
        <p className="mt-2">
          <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
          {newsItem.age
            ? newsItem.age.toUpperCase() + " AGO"
            : newsItem.date?.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default NewsItemLarge;
