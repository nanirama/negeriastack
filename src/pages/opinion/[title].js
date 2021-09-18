import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Seo from '../../components/Seo'
import { getOpinionContent } from "../../actions/OpinonAction";
import { ROUTE_COLORS } from "../../constants/routeConstants/routeURL";
import ErrorPage from "../../components/ErrorPage";

const Opinion = (props) => {
  const [showError, setShowError] = useState(false);
  const [title, setTitle] = useState(null);
  const [seoTitle, setSeoTitle] = useState(null);
  const [seoDescription, setSeoDescription] = useState(null);
  const [seoKeywords, setSeoKeywords] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [section1, updateSection1Content] = useState([]);
  const [section2, updateSection2Content] = useState([]);
  const [section3, updateSection3Content] = useState([]);
  const [section4, updateSection4Content] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setTitle(router.query.title);
    setIsPageLoading(true);
    async function fetchTopicContent() {
      switch (title) {
        case "trending":
          setSeoTitle(
            "Read Latest Trending News in Nigeria Today – NigeriaStack"
          );
          setSeoDescription(
            "Get access to all the latest trending news in Nigeria and know what’s happening around you. NigeriaStack features exclusive headlines and top stories online here. "
          );
          setSeoKeywords(
            "trending news in Nigeria, Nigeria trending news, trending news in nigeria today, latest trending news in nigeria,"
          );
          break;
        case "news":
          setSeoTitle(
            "See Latest Nigerian news Headlines today online - NigeriaStack"
          );
          setSeoDescription(
            "Read latest news paper headlines every day at NigeriaStack online. We offer complete access to hot news, and coverage on daily Nigerian newspaper headlines here."
          );
          setSeoKeywords(
            "newspaper headlines today in nigeria, nigeria news today headlines,latest nigeria news headlines, nigeria news papers headlines today, nigeria newspapers headlines, nigeria newspaper headlines online, nigeria newspaper headlines today online, nigerian newspapers headlines today online, latest nigeria newspaper headlines today, nigeria newspaper headlines online today."
          );
          break;
        case "sports":
          setSeoTitle("Breaking and Latest Nigeria Sports News - NigeriaStack");
          setSeoDescription(
            "Check out latest sports news about soccer, football, basketball, football and boxing at NigeriaStack. Your one-stop place for latest Nigerian and international sports headlines and breaking news."
          );
          setSeoKeywords(
            "Nigeria sports breaking news, nigeria sports news, nigeria sport news, latest nigeria sports news, nigeria sports breaking news,"
          );
          break;
        case "technology":
          setSeoTitle(
            "Check Out Latest Nigerian Technology News- NigeriaStack"
          );
          setSeoDescription(
            "NigeriaStack provides the most trusted and latest technology news in Nigeria. Sign up to get access to trending tech news online every day. "
          );
          setSeoKeywords(
            "nigeria technology news, latest technology news in nigeria, nigerian tech news, latest tech news in nigeria, technology news in nigeria,"
          );
          break;
        case "business":
          setSeoTitle("Get Latest Business News in Nigeria- NigeriaStack");
          setSeoDescription(
            "Sign up to get the latest business, economic and stock market news from Nigeria online. See what’s happening in the business market and stay updated."
          );
          setSeoKeywords(
            "latest nigeria business news, nigeria business news, Latest Business News in Nigeria, Business news in Nigeria"
          );
          break;
        case "music":
          setSeoTitle(
            "Trending and Latest Music entertainment Industry News in Nigeria"
          );
          setSeoDescription(
            "Read trending news in Nigeria music industry and check out latest music news. Stay updated about the new music videos, upcoming albums, shows and much more."
          );
          setSeoKeywords(
            "nigeria music entertainment news,latest music news in nigeria,trending news in nigeria music industry,latest news in music industry in nigeria,entertainment news in nigeria music industry, latest nigeria music news,"
          );
          break;

        default:
          break;
      }
      const res = await getOpinionContent(router.query.title);
      const data = res;
      if (data && data.length > 0) {
        setIsPageLoading(false);
        const first = data.slice(0, 3);
        updateSection1Content(first);
        let second = data.slice(3, 9);
        updateSection2Content(second);
        let third = data.slice(9, 15);
        updateSection3Content(third);
        let last = data.slice(15, 20);
        updateSection4Content(last);
      } else {
        setShowError(true);
      }
    }
    fetchTopicContent();
    window.scrollTo(0, 0);
  }, [router.query.title, title]);
  return (
    <div className="container-fluid topic-page-container">
      {showError && <ErrorPage />}
      {isPageLoading && !showError && (
        <div className="loader-div">
          <div className="loader" id="loader-1"></div>
        </div>
      )}
      {!isPageLoading && !showError && (
        <div>
          {seoTitle && (
            <Seo
              title={seoTitle}
              description={seoDescription}
              keywords={seoKeywords}
            />
          )}
          <div
            className="text-center topic-title"
            style={{ color: ROUTE_COLORS[`${title}`] }}
          >
            <h1>{"latest " + title + " headlines in Nigeria"}</h1>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div
                className={`seprator-colored color-${title} pt-2`}
                style={{ borderColor: ROUTE_COLORS[`${title}`] }}
              ></div>
            </div>
          </div>
          {section1 && section1.length > 0 && (
            <div className="row">
              <div className="col-lg-8 topic-page-top-left col-md-12">
                <div className="all-article-container">
                  <div className="article-data half-partioned">
                    <div className="article-image">
                      <img
                        alt={section1[0].title}
                        src={section1[0].image_backup || section1[0].image}
                      />
                    </div>
                    <div className="article-content-text pr-0 pl-3">
                      <Link
                        href={`/article/${section1[0].id}/${section1[0].title
                          .toLowerCase()
                          .replace(/[^a-zA-Z ]/g, "")
                          .replace(/ /g, "-")}`}
                      >
                        <h3>
                          {section1[0].title.substring(0, 80) +
                            (section1[0].title.length > 80 ? "..." : "")}
                        </h3>
                      </Link>
                      <p>{section1[0].text}</p>

                      <div>
                        <span style={{ color: "#808080" }}>
                          {" "}
                          {section1[0].age + " ago"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 topic-page-top-right col-md-12">
                <div className="mobile-seprator"></div>
                <div className="right-article-container">
                  <p className="read-head">Read</p>
                  <div className="article-data  small-article   content-padding-right">
                    <div className="article-content-text">
                      <Link
                        href={`/article/${section1[1].id}/${section1[1].title
                          .toLowerCase()
                          .replace(/[^a-zA-Z ]/g, "")
                          .replace(/ /g, "-")}`}
                      >
                        <h3>
                          {section1[1].title.substring(0, 80) +
                            (section1[1].title.length > 80 ? "..." : "")}
                        </h3>
                      </Link>
                      <p>{section1[1].text}</p>
                    </div>
                  </div>
                  <div className="article-data  small-article   content-padding-right">
                    <div className="article-content-text">
                      <Link
                        href={`/article/${section1[2].id}/${section1[2].title
                          .toLowerCase()
                          .replace(/[^a-zA-Z ]/g, "")
                          .replace(/ /g, "-")}`}
                      >
                        <h3>
                          {section1[2].title.substring(0, 80) +
                            (section1[2].title.length > 80 ? "..." : "")}
                        </h3>
                      </Link>
                      <p>{section1[2].text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="theme-seprator theme-padding"></div>
          <div className="row">
            <div className="col-md-8  topic-page-bottom-left">
              <div className="all-article-container">
                {section2 && section2.length > 0 && (
                  <div className="row topic-article-grid">
                    {section2.map((data, index) => (
                      <div className="col-md-6  col-xl-4">
                        <div className="article-data medium-article-1">
                          <div className="article-image">
                            <img
                              alt={data.title}
                              src={data.image_backup || data.image}
                              className="img-fluid"
                            />
                          </div>
                          <div className="article-content-text">
                            <Link
                              href={`/article/${data.id}/${data.title
                                .toLowerCase()
                                .replace(/[^a-zA-Z ]/g, "")
                                .replace(/ /g, "-")}`}
                            >
                              <h3>
                                {data.title.substring(0, 80) +
                                  (data.title.length > 80 ? "..." : "")}
                              </h3>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {section3 && section3.length > 0 && (
                  <div className="row topic-article-grid">
                    {section3.map((data, index) => (
                      <div className="col-md-6  col-xl-4">
                        <div className="article-data medium-article-1">
                          <div className="article-image">
                            <img
                              alt={data.title}
                              src={data.image_backup || data.image}
                              className="img-fluid"
                            />
                          </div>
                          <div className="article-content-text">
                            <Link
                              href={`/article/${data.id}/${data.title
                                .toLowerCase()
                                .replace(/[^a-zA-Z ]/g, "")
                                .replace(/ /g, "-")}`}
                            >
                              <h3>
                                {data.title.substring(0, 80) +
                                  (data.title.length > 80 ? "..." : "")}
                              </h3>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {section4 && section4.length > 0 && (
              <div className="col-md-4 text-center topic-page-bottom-right">
                <div className="mobile-seprator"></div>
                <div className="right-article-container topic-right">
                  {section4.map((data, index) => (
                    <div>
                      <div className="article-data small-article">
                        <Link
                          href={`/article/${data.id}/${data.title
                            .toLowerCase()
                            .replace(/[^a-zA-Z ]/g, "")
                            .replace(/ /g, "-")}`}
                        >
                          <a className="heading-visible-mobile">
                            <h3>{data.title}</h3>
                          </a>
                        </Link>

                        <div className="mobile-small-left-content">
                          <div className="article-image">
                            <img
                              alt={data.title}
                              src={data.image_backup || data.image}
                              width="200"
                              className="img-fluid"
                            />
                          </div>
                          <div className="article-content-text">
                            <Link
                              href={`/article/${data.id}/${data.title
                                .toLowerCase()
                                .replace(/[^a-zA-Z ]/g, "")
                                .replace(/ /g, "-")}`}
                            >
                              <h3>
                                {data.title.substring(0, 80) +
                                  (data.title.length > 80 ? "..." : "")}
                              </h3>
                            </Link>
                            <p>{data.text}</p>
                          </div>
                        </div>
                      </div>
                      <div className="theme-seprator "></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Opinion;
