import React from "react";
import { useRouter } from "next/router";

import {
  getStrippedTitle,
  getStrippedText,
  getArticleLink,
} from "../../utils/helper";

const NewsItemMediumWithText = ({ newsItem }) => {
  const router = useRouter();

  return (
    <div
      className="news-item-medium"
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
        <p style={{ color: "grey" }}>{getStrippedText(newsItem.text, 200)}</p>
        <p style={{ color: "grey" }}>
          <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
          {newsItem.age.toUpperCase() + " AGO"}
        </p>
      </div>
    </div>
  );
};

export default NewsItemMediumWithText;
