import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { getArticleContent } from "../../../actions/ArticleAction";
import { getTopicContent } from "../../../actions/TopicAction";
import ErrorPage from "../../../components/ErrorPage";

const Post = () => {
  const [showError, setShowError] = useState(false);
  const [structuredData, setStructuredData] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [content, updateContent] = useState({});
  const [text1, updateText1] = useState("");
  const [text2, updateText2] = useState([]);
  const [footerContent, updateFooterContent] = useState([]);
  const [RightColumnContent1, updateRightColumnContent1] = useState([]);
  const [RightColumnContent2, updateRightColumnContent2] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setIsPageLoading(true);
    async function fetchArticleContent() {
      const data = await getArticleContent(router.query.id);
      if (data && data.id && data.id > 0) {
        setIsPageLoading(false);
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
        const response = await getTopicContent(data.topic);
        if (response) {
          const first = response.slice(0, 5);
          updateFooterContent(first);
          let second = response.slice(5, 7);
          updateRightColumnContent1(second);
          let third = response.slice(7, 9);
          updateRightColumnContent2(third);
        }
      } else {
        setShowError(true);
      }
    }
    fetchArticleContent();
    window.scrollTo(0, 0);
  }, [router.query.id]);
  return (
    <div className="container-fluid">
      {showError && <ErrorPage />}
      {isPageLoading && !showError && (
        <div className="loader-div">
          <div className="loader" id="loader-1"></div>
        </div>
      )}
      {!isPageLoading && !showError && (
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
              <title>{structuredData.title}</title>
              <meta
                name="description"
                content="Get access to all the latest trending news in Nigeria and know what’s happening around you. NigeriaStack features exclusive headlines and top stories online here. "
              ></meta>
              <meta
                name="keywords"
                content="newspaper headlines today in nigeria, nigeria news today headlines,latest nigeria news headlines, nigeria news papers headlines today, nigeria newspapers headlines, nigeria newspaper headlines online, nigeria newspaper headlines today online, nigerian newspapers headlines today online, latest nigeria newspaper headlines today, nigeria newspaper headlines online today."
              ></meta>
            </Head>
          )}
          <div className="text-center topic-title mb-3 single-article-title">
            news
          </div>
          <div className="back-button" onClick={() => router.back()}>
            <i className="fa fa-chevron-left"></i>Back{" "}
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="seprator-colored color-blue "></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 single-article-page">
              <div className="all-article-container">
                <div className="article-content-text w-100">
                  {content.title && <h3>{content.title}</h3>}
                </div>
                <div className="article-data half-partioned full-article">
                  <div className="article-image">
                    <img
                      alt={content.title}
                      src={content.image_backup || content.image}
                    />
                  </div>
                  <div className="article-content-text pr-0 pl-3">
                    {content.text && (
                      <p style={{ textAlign: "justify" }}>
                        <strong>{text1} </strong>
                      </p>
                    )}
                  </div>
                </div>
                <div className="article-data half-partioned full-article">
                  <div className="article-content-text  w-100">
                    <br></br>
                    <div>
                      <strong>
                        According to{" "}
                        <a
                          style={{ background: "#CAFF33" }}
                          href={content.original_article_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {content.original_news_source}
                        </a>
                      </strong>
                    </div>

                    {text2 &&
                      text2.length > 0 &&
                      text2.map((data) => (
                        <p style={{ textAlign: "justify" }}>
                          <br />
                          {"***" + data}
                        </p>
                      ))}
                    <br></br>
                    <div>
                      <span style={{ color: "#808080" }}>
                        {" "}
                        {content.age + " ago"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mobile-seprator"></div>
                <div className="theme-seprator section-seprator"></div>
                <div className="in-page-title">Related News</div>
                <div className="theme-seprator  section-seprator"></div>
                <div className="row mt-5 show-article-5 single-article-bottom-grid">
                  {footerContent &&
                    footerContent.length > 0 &&
                    footerContent.map((content) => (
                      <div className="col-md-6 col-lg-4 ">
                        <div className="article-data small-article text-center">
                          <div className="article-image">
                            <img
                              alt={content.title}
                              src={content.image_backup || content.image}
                              width="175"
                              className="img-fluid"
                            />
                          </div>
                          <div className="article-content-text">
                            <Link
                              href={`/article/${content.id}/${content.title
                                .toLowerCase()
                                .replace(/[^a-zA-Z ]/g, "")
                                .replace(/ /g, "-")}`}
                            >
                              <h3>
                                {content.title.substring(0, 70) +
                                  (content.title.length > 80 ? "..." : "")}
                              </h3>
                            </Link>
                            <p>{content.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="col-md-4 hidden-section-mobile single-article-right-side">
              <div className="right-article-container topic-right">
                {RightColumnContent1 &&
                  RightColumnContent1.length > 0 &&
                  RightColumnContent1.map((content) => (
                    <div className="article-data  small-article   content-padding-right">
                      <div className="article-content-text">
                        <Link
                          href={`/article/${content.id}/${content.title
                            .toLowerCase()
                            .replace(/[^a-zA-Z ]/g, "")
                            .replace(/ /g, "-")}`}
                        >
                          <h3>
                            {content.title.substring(0, 70) +
                              (content.title.length > 80 ? "..." : "")}
                          </h3>
                        </Link>
                        <p>{content.text}</p>
                      </div>
                    </div>
                  ))}

                <div className="theme-seprator "></div>
                {RightColumnContent2 &&
                  RightColumnContent2.length > 0 &&
                  RightColumnContent2.map((content) => (
                    <div>
                      <div className="article-data small-article text-center">
                        <div className="article-image">
                          <img
                            alt={content.title}
                            src={content.image_backup || content.image}
                            width="200"
                            className="img-fluid"
                          />
                        </div>
                        <div className="article-content-text">
                          <Link
                            href={`/article/${content.id}/${content.title
                              .toLowerCase()
                              .replace(/[^a-zA-Z ]/g, "")
                              .replace(/ /g, "-")}`}
                          >
                            <h3>
                              {content.title.substring(0, 70) +
                                (content.title.length > 80 ? "..." : "")}
                            </h3>
                          </Link>
                          <p>{content.text}</p>
                        </div>
                      </div>
                      <div className="theme-seprator "></div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Post;
