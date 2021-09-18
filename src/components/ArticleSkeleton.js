import React from 'react';
import Skeleton from "react-loading-skeleton";
import NewsItemSmall from './newsItem/newsItemSmall';

const ArticleSkeleton = () => {
  return (
    <div>
      <div className="row mt-4">
        <div className="col-md-8 article-left pr-4">
          <div className="row article-image-wrapper">
            <section style={{ width: "100%" }}>
              <Skeleton height={450} />
            </section>
          </div>

          <div className="row my-4">
            <p style={{ width: "100%" }}>
              <Skeleton count={4} />
            </p>
          </div>

          <div className="row article-text">
            <p>
              {" "}
              <Skeleton />{" "}
            </p>

            <div className="mid-text-items-wrapper">
              {[1, 2].map((item, index) => {
                return <NewsItemSmall key={index} placeholder />;
              })}
            </div>

            <p style={{ width: "100%" }}>
              <Skeleton count={8} />
            </p>
          </div>
        </div>

        <div className="col-md-4 pt-2 pl-5 article-sidebar">
          <div className="home-divider">LATEST POSTS</div>
          <div className="article-latest-posts">
            {[1, 2, 3, 4, 5, 6].map((newsItem, index) => (
              <div key={index} className="article-latest-post">
                <NewsItemSmall placeholder />
              </div>
            ))}
          </div>

          <div className="home-divider mt-5">More Headlines</div>
          <div className="article-more-headlines">

            <div
              className={`article-more-headline n1`}
              style={{ width: "100%" }}
            >
              <Skeleton height={300} />
            </div>

            {[1, 2, 3, 4, 5, 6, 7, 8].map((newsItem, index) => (
              <div
                className={`article-more-headline n${index + 2}`}
                style={{ width: "100%" }}
                key={index}
              >
                <Skeleton height={150} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default ArticleSkeleton;