import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Seo from '../../../components/Seo'
import { getArticleContent } from "../../../actions/ArticleAction";
import { getHomeContent } from "../../../actions/HomeAction";
import ErrorPage from "../../../components/ErrorPage";
import NewsItemSmall from "../../../components/newsItem/newsItemSmall";
import NewsItemCard from "../../../components/newsItem/newsItemCard";
import NewsItemArticleSidebar from "../../../components/newsItem/newsItemArticleSidebar";
import ArticleSkeleton from "../../../components/ArticleSkeleton";

import { getArticleLink, getStrippedText } from "../../../utils/helper";
import filterTopic from "../../../services/filterTopic";

const Article = ({ articleTitle, articleDescription, articleImage }) => {
  const [showError, setShowError] = useState(false);
  const [structuredData, setStructuredData] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [content, updateContent] = useState({});
  const [text1, updateText1] = useState("");
  const [text2, updateText2] = useState([]);
  const [articleType, setArticleType] = useState("");
  const [footerContent, updateFooterContent] = useState([]);
  const [RightColumnContent1, updateRightColumnContent1] = useState([]);
  const [RightColumnContent2, updateRightColumnContent2] = useState([]);
  const [homeContent, setHomeContent] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setIsPageLoading(true);
    const articleType = router.query.type;
    setArticleType(articleType);
    async function fetchArticleContent() {
      const data = await getArticleContent(router.query.id, articleType);
      const homeData = await getHomeContent();
      setHomeContent(homeData.data);

      if (data && data.id && data.id > 0) {
        updateContent(data);
        const formattedText = data.text.replace(/\n\n/g, ". ");
        const firstPart = formattedText.substring(0, 350);
        const [firstPartContent, reminder] = firstPart.split(/\.(?=[^\.]+$)/);
        const secondPart = reminder + data.text.substring(350);
        const iterator = Math.round(secondPart.length / 500);
        const secondPartArray = [];
        const { title, image } = data;
        setStructuredData({
          title,
          image,
          url: window.location.href,
        });
        let immediateSectionAfterImage = "";
        let startIndex = 0;
        for (let i = 1; i <= iterator; i++) {
          if (i === iterator) {
            const data = secondPart.substring(startIndex);
            secondPartArray.push(immediateSectionAfterImage + data);
          } else {
            const endIndex = startIndex + 500;
            const [firstSectionOfSecondPart, secondSectionOfSecondPart] =
              secondPart.substring(startIndex, endIndex).split(/\.(?=[^\.]+$)/);
            secondPartArray.push(
              immediateSectionAfterImage + firstSectionOfSecondPart + ". "
            );
            immediateSectionAfterImage = secondSectionOfSecondPart;
            startIndex = endIndex;
          }
        }
        updateText1(firstPartContent);
        updateText2(secondPartArray);

        const response = filterTopic(homeData.data, data.topic);
        if (response) {
          const first = response.slice(0, 5);
          updateFooterContent(first);
          let second = response.slice(5, 7);
          updateRightColumnContent1(second);
          let third = response.slice(7, 9);
          updateRightColumnContent2(third);
        }
        setIsPageLoading(false);
      } else {
        setShowError(true);
      }
    }
    fetchArticleContent();
    window.scrollTo(0, 0);
  }, [router.query]);
  return (
    <div className="container-fluid">
      <Seo
          title={articleTitle}
          description="Get access to all the latest trending news in Nigeria and know what’s happening around you. NigeriaStack features exclusive headlines and top stories online here. "
          keywords="newspaper headlines today in nigeria, nigeria news today headlines,latest nigeria news headlines, nigeria news papers headlines today, nigeria newspapers headlines, nigeria newspaper headlines online, nigeria newspaper headlines today online, nigerian newspapers headlines today online, latest nigeria newspaper headlines today, nigeria newspaper headlines online today."
        />
      <Head>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:site" content="@nigeriastack"></meta>
        <meta name="twitter:creator" content="@nigeriastack"></meta>
        <meta
          name="twitter:title"
          property="og:title"
          content={articleTitle}
        ></meta>
        <meta
          name="twitter:description"
          property="og:description"
          content={articleDescription}
        ></meta>
        <meta
          name="twitter:image"
          property="og:image"
          content={articleImage}
        ></meta>
      </Head>

      {showError && <ErrorPage />}

      {!isPageLoading && !showError ? (
        <div>
          {structuredData && (
            <Head>
              <script type="application/ld+json">
                {`{
                            "@context": "https://schema.org",
                            "@type": "NewsArticle",
                            "mainEntityOfPage": {
                                "@type" : "WebPage",
                                "@id": "${structuredData.url}"
                            },
                            "headline": "${structuredData.title}",
                            "image": [
                                "${structuredData.image_backup}"
                            ],
                            "datePublished": "${structuredData.date}",
                            "author": {
                            "@type": "Organization",
                            "name": "NigeriaStack"
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": "NigeriaStack",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "https://nigeriastack.com/static/media/Logo.d662b54d.png"
                                }
                            }
                        }`}
              </script>
            </Head>
          )}

          <div className="row mt-4">
            <div className="article-left pr-4">
              <div className="row article-image-wrapper">
                <img
                  src={content.image_backup || content.image}
                  alt={content.title}
                />
              </div>

              <div className="row my-4">
                <button className={`article-topic`}>
                  {content?.topic ||
                    (articleType === "opinion" &&
                      `By ${content.authors_name}`) ||
                    (articleType === "world" && "World News")}
                </button>
              </div>

              <div className="row article-heading">{content.title}</div>

              <div className="row article-text">
                <p> {text1} </p>

                <div className="mid-text-items-wrapper">
                  {RightColumnContent1.map((item, index) => {
                    return <NewsItemSmall key={index} newsItem={item} />;
                  })}
                </div>

                <div className="mid-text-items-wrapper-mobile">
                  {RightColumnContent1.map((item, index) => (
                    <div
                      key={index}
                      className="mid-text-item-mobile"
                      onClick={() => router.push(getArticleLink(item))}
                    >
                      <h1>{getStrippedText(item.title, 50)}</h1>
                      <p>{getStrippedText(item.text, 100)}</p>
                      <p>
                        <i
                          className="fa fa-clock-o mr-2 mt-2"
                          aria-hidden="true"
                        ></i>
                        {item.age?.toUpperCase() + " AGO"}
                      </p>
                    </div>
                  ))}
                </div>

                {text2.map((text, index) => {
                  return (
                    <p key={index} className="mb-4">
                      {text}
                    </p>
                  );
                })}

                <p style={{ color: "grey" }}>
                  <i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;
                  {content?.age
                    ? content.age.toUpperCase() + " AGO"
                    : content?.date?.toUpperCase()}
                </p>
              </div>

              {articleType !== "opinion" && articleType !== "world" ? (
                <>
                  <div className="row my-4 section-header">RELATED POSTS</div>

                  <div className="row related-posts-grid">
                    {footerContent.map((newsItem, index) => {
                      return <NewsItemCard key={index} newsItem={newsItem} />;
                    })}
                  </div>
                </>
              ) : null}
            </div>

            <div className="col-md-4 pt-2 pl-5 article-sidebar">
              <div className="home-divider">LATEST POSTS</div>
              <div className="article-latest-posts">
                {(homeContent?.length > 6
                  ? homeContent.slice(0, 6)
                  : homeContent
                ).map((newsItem, index) => (
                  <div key={index} className="article-latest-post">
                    <NewsItemSmall newsItem={newsItem} />
                  </div>
                ))}
              </div>

              <div className="home-divider mt-5">
                More {content.cateogry} Headlines
              </div>
              <div className="article-more-headlines">
                {(homeContent.length > 9
                  ? homeContent.slice(0, 9)
                  : homeContent
                ).map((newsItem, index) => (
                  <div
                    key={index}
                    className={`article-more-headline n${index + 1}`}
                  >
                    <NewsItemArticleSidebar newsItem={newsItem} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : showError ? null : (
        <ArticleSkeleton />
      )}
    </div>
  );
};

export default Article;

Article.getInitialProps = async function ({ query }) {
  const response = await getArticleContent(query.id);
  const {
    title: articleTitle,
    text: articleDescription,
    image_backup: articleImage,
  } = await response;

  return { articleTitle, articleDescription, articleImage };
};
