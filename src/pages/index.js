import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { NextSeo } from 'next-seo';

import { getHomeContent } from "../actions/HomeAction";
import ErrorHandler from "../components/ErrorHandler";
import ErrorPage from "../components/ErrorPage";

import NewsItemLarge from "../components/newsItem/newsItemLarge";
import NewsItemSmall from "../components/newsItem/newsItemSmall";
import NewsItemMedium from "../components/newsItem/newsItemMedium";
import NewsItemOpinion from "../components/newsItem/opinionNewsItem";
import { getStrippedTitle, getArticleLink } from "../utils/helper";
import filterTopic from "../services/filterTopic";
import { getOpinionArticles } from "../actions/OpinonAction";
import getWorldNews from "../services/worldNewsService";

const BusinessIcon = "/assets/icons/business.png";
const HomeIcon = "/assets/icons/home.png";
const TechnologyIcon = "/assets/icons/technology.png";
const NewsIcon = "/assets/icons/news.png";
const SportsIcon = "/assets/icons/sports.png";
const TrendingIcon = "/assets/icons/trending.png";

const home = (props) => {
  const [showError, setShowError] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [section1, updateSection1Content] = useState([]);
  const [screenWidth, updateScreenWidth] = useState(0);

  const [trendingItems, setTrendingItems] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [sportsItems, setSportsItems] = useState([]);
  const [technologyItems, setTechologyItems] = useState([]);
  const [businessItems, setBusinessItems] = useState([]);

  const [mostReadItems, setMostReadItems] = useState([]);
  const [editorialItems, setEditorialItems] = useState([]);
  const [otherNewsItems, setOtherNewsItems] = useState([]);

  const router = useRouter();

  useEffect(() => {
    updateScreenWidth(screen.width);
  }, []);

  async function fetchHomeContent() {
    const { data } = await getHomeContent();

    if (data?.length > 0) {
      setIsPageLoading(false);
      const first = data.slice(0, 5);
      updateSection1Content(first);
      const rightContent = data.slice(10);
      const mostRead = rightContent.slice(
        0,
        Math.ceil(rightContent.length / 2)
      );
      setMostReadItems(mostRead);
    } else {
      setShowError(true);
    }

    setTrendingItems(filterTopic(data, "trending"));
    setNewsItems(filterTopic(data, "news"));
    setSportsItems(filterTopic(data, "sports"));
    setTechologyItems(filterTopic(data, "tech"));
    setBusinessItems(filterTopic(data, "business"));

    const opinion = await getOpinionArticles();
    setEditorialItems(opinion.data);

    const worldNews = await getWorldNews();
    setOtherNewsItems(worldNews.slice(0, 10));
  }

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const SplashNews = ({ newsItems }) => {
    return (
      newsItems &&
      newsItems.length > 4 && (
        <div className="col-md-12 splash-news mb-5">
          {newsItems.map((newsItem, index) => (
            <div
              key={newsItem.id}
              className={`splash-news-${index + 1}`}
              style={{
                backgroundImage: `url(${
                  newsItem.image_backup || newsItem.image
                })`,
              }}
              onClick={() => router.push(getArticleLink(newsItem))}
            >
              <div className="inner">
                <p>{getStrippedTitle(newsItem)}</p>
                <p className="mt-2">
                  <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
                  {newsItem.age.toUpperCase() + " AGO"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )
    );
  };

  return (
    <ErrorHandler>
      <div>
      <NextSeo
        description="1 Stay yourself updated with top of Nigeria news and latest developments on the ground with fact-based news, exclusive video footage and updated maps. Explore Nigerian newspapers headlines."
      />
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="title"
            content="Latest Nigerian News and Naija Breaking News Today – Nigeria Stack"
          ></meta>
          <meta
            name="description"
            content="2 Stay yourself updated with top of Nigeria news and latest developments on the ground with fact-based news, exclusive video footage and updated maps. Explore Nigerian newspapers headlines."   ></meta>
          <meta
            name="keywords"
            content="Latest Nigerian News, Naija Breaking News Today, nigerian newspapers headlines, Latest Nigerian breaking news today"
          ></meta>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <link
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <script type="application/ld+json">
            {`{"@context":"http://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"https://nigeriastack.com/","name":"Home"}}]}`}
          </script>
          <script type="application/ld+json">{`{"@context":"http://schema.org","@type":"Organization","name":"NigeriaStack","url":"https://nigeriastack.com/","logo":"https://nigeriastack.com/static/media/Logo.d662b54d.png","sameAs":
["https://twitter.com/nigeriastack"]}`}</script>
          <script type="application/ld+json">
            {`{"@context":"http://schema.org","@type":"SiteNavigationElement","name":["Trending","News","Sports","technology","Business","Music"],"url":["https://nigeriastack.com/topic/trending","https://nigeriastack.com/topic/news","https://nigeriastack.com/topic/sports","https://nigeriastack.com/topic/technology","https://nigeriastack.com/topic/business","https://nigeriastack.com/topic/music"]}`}
          </script>
          <script type="application/ld+json">{`{"@context":"http://schema.org","@type":"WebSite","name":"NigeriaStack","alternateName":"NigeriaStack","url":"https://nigeriastack.com"}`}</script>
          <script type="application/ld+json">
            {`{"@context":"http://schema.org","@type":"LocalBusiness","name":" NigeriaStack","priceRange": "$$$","telephone": "0","image":" https://nigeriastack.com/static/media/Logo.d662b54d.png","url":"https://nigeriastack.com","address":{"@type":"PostalAddress","streetAddress":"Lagos","addressLocality":"Lagos","postalCode":"100121","addressCountry":"NG"}}`}
          </script>
        </Head>

        <div className="container-fluid">
          {showError && <ErrorPage />}
          {isPageLoading && !showError && (
            <div className="loader-div">
              <div className="loader" id="loader-1"></div>
            </div>
          )}

          {!isPageLoading && !showError && screenWidth > 1100 && (
            <div className="row desktop-home-view">
              <div className="col-md-12">
                <div className="separator">
                  <h1>NIGERIA NEWS</h1>
                </div>
              </div>

              <SplashNews
                newsItems={
                  section1 && section1.length > 4
                    ? section1.slice(0, 5)
                    : section1
                }
              />

              <div className="col-md-8">
                <div>
                  <div className="home-divider trending">
                    <img src={TrendingIcon} alt="Trending" /> Trending
                  </div>

                  {trendingItems.length ? (
                    <div className="trending-grid">
                      <div className="n1">
                        <NewsItemLarge newsItem={trendingItems[0]} />
                      </div>
                      <div className="n2">
                        <NewsItemMedium newsItem={trendingItems[1]} />
                      </div>
                      <div className="n3">
                        <NewsItemSmall newsItem={trendingItems[2]} />
                      </div>
                      <div className="n4">
                        <NewsItemSmall newsItem={trendingItems[3]} />
                      </div>
                      <div className="n5">
                        <NewsItemSmall newsItem={trendingItems[4]} />
                      </div>
                      <div className="n6">
                        <NewsItemSmall newsItem={trendingItems[5]} />
                      </div>
                      <div className="n7">
                        <NewsItemSmall newsItem={trendingItems[6]} />
                      </div>
                      <div className="n8">
                        <NewsItemSmall newsItem={trendingItems[7]} />
                      </div>
                      <div className="n9">
                        <NewsItemSmall newsItem={trendingItems[8]} />
                      </div>
                      <div className="n10">
                        <NewsItemLarge newsItem={trendingItems[10]} />
                      </div>
                    </div>
                  ) : (
                    <div className="loader-small"></div>
                  )}
                </div>

                <div className="mt-5">
                  <div className="home-divider news">
                    <img src={NewsIcon} alt="News" /> News
                  </div>

                  {newsItems.length ? (
                    <div className="news-grid">
                      <div className="n1">
                        <NewsItemMedium newsItem={newsItems[0]} />
                      </div>
                      <div className="n2">
                        <NewsItemMedium newsItem={newsItems[1]} />
                      </div>
                      <div className="n3">
                        <NewsItemSmall newsItem={newsItems[2]} />
                      </div>
                      <div className="n4">
                        <NewsItemSmall newsItem={newsItems[3]} />
                      </div>
                      <div className="n5">
                        <NewsItemSmall newsItem={newsItems[4]} />
                      </div>
                      <div className="n6">
                        <NewsItemSmall newsItem={newsItems[5]} />
                      </div>
                      <div className="n7">
                        <NewsItemSmall newsItem={newsItems[6]} />
                      </div>
                      <div className="n8">
                        <NewsItemSmall newsItem={newsItems[7]} />
                      </div>
                      <div className="n9">
                        <NewsItemMedium newsItem={newsItems[8]} />
                      </div>
                      <div className="n10">
                        <NewsItemMedium newsItem={newsItems[9]} />
                      </div>
                    </div>
                  ) : (
                    <div className="loader-small"></div>
                  )}
                </div>

                <div className="mt-5">
                  <div className="home-divider sports">
                    <img src={SportsIcon} alt="Sports" /> Sports
                  </div>

                  {sportsItems.length ? (
                    <div className="sports-grid">
                      <div className="n1">
                        <NewsItemMedium newsItem={sportsItems[0]} />
                      </div>
                      <div className="n2">
                        <NewsItemMedium newsItem={sportsItems[1]} />
                      </div>
                      <div className="n3">
                        <NewsItemSmall newsItem={sportsItems[2]} />
                      </div>
                      <div className="n4">
                        <NewsItemSmall newsItem={sportsItems[3]} />
                      </div>
                      <div className="n5">
                        <NewsItemSmall newsItem={sportsItems[4]} />
                      </div>
                      <div className="n6">
                        <NewsItemSmall newsItem={sportsItems[5]} />
                      </div>
                      <div className="n7">
                        <NewsItemSmall newsItem={sportsItems[6]} />
                      </div>
                      <div className="n8">
                        <NewsItemSmall newsItem={sportsItems[7]} />
                      </div>
                      <div className="n9">
                        <NewsItemMedium newsItem={sportsItems[8]} />
                      </div>
                      <div className="n10">
                        <NewsItemMedium newsItem={sportsItems[9]} />
                      </div>
                    </div>
                  ) : (
                    <div className="loader-small"></div>
                  )}
                </div>

                <div className="mt-5">
                  <div className="home-divider technology">
                    <img src={TechnologyIcon} alt="Technology" /> Technology
                  </div>

                  {technologyItems.length ? (
                    <div className="technology-grid">
                      <div className="n1">
                        <NewsItemSmall newsItem={technologyItems[0]} />
                      </div>
                      <div className="n2">
                        <NewsItemMedium newsItem={technologyItems[1]} />
                      </div>
                      <div className="n3">
                        <NewsItemSmall newsItem={technologyItems[2]} />
                      </div>
                      <div className="n4">
                        <NewsItemSmall newsItem={technologyItems[3]} />
                      </div>
                      <div className="n5">
                        <NewsItemSmall newsItem={technologyItems[4]} />
                      </div>
                      <div className="n6">
                        <NewsItemSmall newsItem={technologyItems[5]} />
                      </div>
                      <div className="n7">
                        <NewsItemSmall newsItem={technologyItems[6]} />
                      </div>
                      <div className="n8">
                        <NewsItemSmall newsItem={technologyItems[7]} />
                      </div>
                      <div className="n9">
                        <NewsItemMedium newsItem={technologyItems[8]} />
                      </div>
                      <div className="n10">
                        <NewsItemMedium newsItem={technologyItems[9]} />
                      </div>
                    </div>
                  ) : (
                    <div className="loader-small"></div>
                  )}
                </div>

                <div className="mt-5">
                  <div className="home-divider business">
                    <img src={BusinessIcon} alt="News" /> Business
                  </div>

                  {businessItems.length ? (
                    <div className="business-grid">
                      <div className="n1">
                        <NewsItemMedium newsItem={businessItems[0]} />
                      </div>
                      <div className="n2">
                        <NewsItemSmall newsItem={businessItems[1]} />
                      </div>
                      <div className="n3">
                        <NewsItemSmall newsItem={businessItems[2]} />
                      </div>
                      <div className="n4">
                        <NewsItemSmall newsItem={businessItems[3]} />
                      </div>
                      <div className="n5">
                        <NewsItemMedium newsItem={businessItems[4]} />
                      </div>
                      <div className="n6">
                        <NewsItemMedium newsItem={businessItems[5]} />
                      </div>
                      <div className="n7">
                        <NewsItemSmall newsItem={businessItems[6]} />
                      </div>
                      <div className="n8">
                        <NewsItemSmall newsItem={businessItems[7]} />
                      </div>
                      <div className="n9">
                        <NewsItemLarge newsItem={businessItems[8]} />
                      </div>
                      <div className="n10">
                        <NewsItemLarge newsItem={businessItems[9]} />
                      </div>
                    </div>
                  ) : (
                    <div className="loader-small"></div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="right-article-container mt-5">
                  <div className="home-divider">OPINIONS AND EDITORIALS</div>
                  {editorialItems?.length
                    ? editorialItems.map((data, index) => (
                        <div
                          style={{ height: "300px", marginTop: "10px" }}
                          key={index}
                        >
                          <NewsItemOpinion newsItem={data} />
                        </div>
                      ))
                    : null}

                  <div className="home-divider mt-5">MOST READ</div>
                  {mostReadItems.length
                    ? mostReadItems.slice(0, 10).map((data, index) => (
                        <div
                          style={{ height: "120px", marginTop: "10px" }}
                          key={index}
                        >
                          <NewsItemSmall newsItem={data} />
                        </div>
                      ))
                    : null}

                  <div className="home-divider mt-5">IN OTHER NEWS</div>
                  {otherNewsItems?.length
                    ? otherNewsItems.slice(0, 10).map((data, index) => (
                        <div
                          style={{ height: "120px", marginTop: "10px" }}
                          key={index}
                        >
                          <NewsItemSmall newsItem={data} />
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          )}

          {/* mobile content-starts here */}

          {!isPageLoading && !showError && screenWidth <= 1100 && (
            <div className="row mobile-content">
              <div className="col-md-12">
                <div className="separator">
                  {" "}
                  <h1>TOP NEWS</h1>{" "}
                </div>

                {section1.length ? (
                  <div className="three-item-mobile-grid ">
                    <div className="n1" style={{ border: "4px solid red" }}>
                      <NewsItemLarge newsItem={section1[0]} />
                    </div>
                    <div className="n2">
                      <NewsItemLarge newsItem={section1[1]} />
                    </div>
                    <div className="n3">
                      <NewsItemLarge newsItem={section1[2]} />
                    </div>
                  </div>
                ) : (
                  <div className="loader-small"></div>
                )}

                <div className="mobile-separator-home"> </div>

                <div className="categories-container">
                  <p>Categories</p>
                  <div className="categories">
                    <div className="trending">
                      <Link href="/topic/trending">
                        <a>
                          <img src={TrendingIcon} alt="Trending" />
                        </a>
                      </Link>
                      <p>Trending</p>
                    </div>
                    <div className="news">
                      <Link href="/topic/news">
                        <a>
                          <img src={NewsIcon} alt="News" />
                        </a>
                      </Link>
                      <p>News</p>
                    </div>
                    <div className="sports">
                      <Link href="/topic/sports">
                        <a>
                          <img src={SportsIcon} alt="Sports" />
                        </a>
                      </Link>
                      <p>Sports</p>
                    </div>
                    <div className="technology">
                      <Link href="/topic/technology">
                        <a>
                          <img src={TechnologyIcon} alt="Technology" />
                        </a>
                      </Link>
                      <p>Technology</p>
                    </div>
                    <div className="business">
                      <Link href="/topic/business">
                        <a>
                          <img src={BusinessIcon} alt="Business" />
                        </a>
                      </Link>
                      <p>Business</p>
                    </div>
                    <div className="home">
                      <Link href="/">
                        <a>
                          <img src={HomeIcon} alt="Home" />
                        </a>
                      </Link>
                      <p>Home</p>
                    </div>
                  </div>
                </div>

                <div className="mobile-separator-home"> </div>

                <div>
                  <div>
                    <div className="home-divider-mobile trending">
                      <img src={TrendingIcon} alt="Trending" /> Trending
                    </div>

                    {trendingItems.length ? (
                      <div className="three-item-mobile-grid">
                        <div className="n1">
                          <NewsItemLarge newsItem={trendingItems[0]} />
                        </div>
                        <div className="n2">
                          <NewsItemMedium newsItem={trendingItems[1]} />
                        </div>
                        <div className="n3">
                          <NewsItemMedium newsItem={trendingItems[2]} />
                        </div>
                      </div>
                    ) : (
                      <div className="loader-small"></div>
                    )}
                  </div>

                  <div className="mobile-separator-home"> </div>

                  <div className="mt-5">
                    <div className="home-divider-mobile news">
                      <img src={NewsIcon} alt="News" /> News
                    </div>

                    {newsItems.length ? (
                      <div className="four-item-mobile-grid">
                        <div className="n1">
                          <NewsItemLarge newsItem={newsItems[0]} />
                        </div>
                        <div className="n2">
                          <NewsItemLarge newsItem={newsItems[1]} />
                        </div>
                        <div className="n3">
                          <NewsItemMedium newsItem={newsItems[2]} />
                        </div>
                        <div className="n4">
                          <NewsItemMedium newsItem={newsItems[3]} />
                        </div>
                      </div>
                    ) : (
                      <div className="loader-small"></div>
                    )}
                  </div>

                  <div className="mobile-separator-home"> </div>

                  <div className="mt-5">
                    <div className="home-divider-mobile sports">
                      <img src={SportsIcon} alt="Sports" /> Sports
                    </div>

                    {sportsItems.length ? (
                      <div className="three-item-mobile-grid">
                        <div className="n1">
                          <NewsItemLarge newsItem={sportsItems[0]} />
                        </div>
                        <div className="n2">
                          <NewsItemMedium newsItem={sportsItems[1]} />
                        </div>
                        <div className="n3">
                          <NewsItemMedium newsItem={sportsItems[2]} />
                        </div>
                      </div>
                    ) : (
                      <div className="loader-small"></div>
                    )}
                  </div>

                  <div className="mobile-separator-home"> </div>

                  <div className="mt-5">
                    <div className="home-divider-mobile technology">
                      <img src={TechnologyIcon} alt="Technology" /> Technology
                    </div>

                    {technologyItems.length ? (
                      <div className="three-item-mobile-grid">
                        <div className="n1">
                          <NewsItemLarge newsItem={technologyItems[0]} />
                        </div>
                        <div className="n2">
                          <NewsItemMedium newsItem={technologyItems[1]} />
                        </div>
                        <div className="n3">
                          <NewsItemMedium newsItem={technologyItems[2]} />
                        </div>
                      </div>
                    ) : (
                      <div className="loader-small"></div>
                    )}
                  </div>

                  <div className="mobile-separator-home"> </div>

                  <div className="mt-5">
                    <div className="home-divider-mobile business">
                      <img src={BusinessIcon} alt="News" /> Business
                    </div>

                    {businessItems.length ? (
                      <div className="three-item-mobile-grid">
                        <div className="n1">
                          <NewsItemLarge newsItem={businessItems[0]} />
                        </div>
                        <div className="n2">
                          <NewsItemMedium newsItem={businessItems[1]} />
                        </div>
                        <div className="n3">
                          <NewsItemMedium newsItem={businessItems[2]} />
                        </div>
                      </div>
                    ) : (
                      <div className="loader-small"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* mobile content-ends here */}
        </div>
        {/* ))
            )} */}
      </div>
    </ErrorHandler>
  );
};
export default home;
