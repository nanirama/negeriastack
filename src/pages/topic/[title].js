import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Seo from '../../components/Seo'
import { ROUTE_COLORS } from "../../constants/routeConstants/routeURL";
import ErrorPage from "../../components/ErrorPage";
import NewsItemLarge from "../../components/newsItem/newsItemLarge";
import NewsItemSmall from "../../components/newsItem/newsItemSmall";
import NewsItemMediumWithText from "../../components/newsItem/newsItemMediumWithText";
import NewsItemCard from "../../components/newsItem/newsItemCard";
import { getHomeContent } from "../../actions/HomeAction";
import filterTopic from "../../services/filterTopic";
import { getOpinionArticles } from "../../actions/OpinonAction";

const Header = (props) => {
  const [articles, setArticles] = useState([]);
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

  const setSEOTitle = (title) => {
    switch (title) {
      case "trending":
        setSeoTitle(
          "Latest Trending News and Headlines in Nigeria Today– Nigeria Stack"
        );
        setSeoDescription(
          "Get all the latest Nigerian trending news at Nigeria stack. Read all political news, current affairs and news headlines online. Access special reports and other useful information too."
        );
        setSeoKeywords(
          "latest trending headlines in Nigeria, latest nigerian trending news, latest trending news in Nigeria today          "
        );
        break;
      case "news":
        setSeoTitle(
          "Latest Online Nigerian News &Headlines Today– Nigeria Stack"
        );
        setSeoDescription(
          ": All the latest Nigerian news headlines today can be read on at Nigeria Stack. We bring live coverage 24 hours a day. You can expect balanced and in-depth reporting with a focus on global responsibility."
        );
        setSeoKeywords(
          "Latest Nigerian news headlines today, Nigerian news headlines today online, nigerian news headline today"
        );
        break;
      case "sports":
        setSeoTitle(
          "Latest Nigeria Sports Headlines and Breaking News– Nigeria Stack"
        );
        setSeoDescription(
          "Just a click and explore breaking Nigeria sports news and any other related information. Quick updates with latest sports headlines in Nigeria at Nigeria stack."
        );
        setSeoKeywords(
          "Latest Nigeria sports News, Breaking Nigeria sports News, latest sports headlines in Nigeria."
        );
        break;
      case "tech":
        setSeoTitle("Latest Nigerian technology News– Nigeria Stack.");
        setSeoDescription(
          "When it comes to technology then make yourself aware on latest technology by reading latest technology news in Nigeria. Explore more only at Nigeria stack and adapt to new."
        );
        setSeoKeywords(
          "Latest technology news in Nigeria, Latest Nigerian technology News."
        );
        break;
      case "business":
        setSeoTitle(
          "Latest Business News and Headlines in Nigeria– Nigeria Stack."
        );
        setSeoDescription(
          " Business news must be latest to stay competitive and ahead of others. Read on  latest business headlines in Nigeria at Nigeria stack. Be alert to make the best decisions in your business."
        );
        setSeoKeywords(
          "latest business headlines in Nigeria, Latest business news in Nigeria"
        );
        break;
      case "music":
        setSeoTitle(
          "Latest and Trending Music Entertainment News in Nigeria– Nigeria Stack."
        );
        setSeoDescription(
          "Find all about Nigeria on latest Nigerian entertainment news and trending topics. The definitive source for news in Nigeria at a click. Stay yourself updated."
        );
        setSeoKeywords(
          "latest music entertainment news in nigeria, trending music entertainment news in nigeria, Latest Nigerian Entertainment News."
        );
        break;
      default:
        break;
    }
  };

  const getTopicContent = async (title) => {
    try {
      if (title === "opinion") {
        const { data } = await getOpinionArticles();
        setArticles(data);
      } else {
        const { data: homeData } = await getHomeContent();
        const data = filterTopic(homeData, title);

        setArticles(data);
      }
    } catch (error) {
      setShowError(true);
    }
  };

  useEffect(() => {
    setIsPageLoading(true);
    const title = router.query.title;
    setTitle(title);
    setSEOTitle(title);
    getTopicContent(title);
    window.scrollTo(0, 0);
    console.log('Page query 2',title)
  }, [router.query.title]);
  //console.log('page Title', seoKeywords)
  useEffect(() => {
    if (articles && articles.length > 0) {
      setIsPageLoading(false);
      const first = articles.slice(0, 3);
      updateSection1Content(first);
      let second = articles.slice(3, 9);
      updateSection2Content(second);
      let third = articles.slice(9, 15);
      updateSection3Content(third);
      let last = articles.slice(15, 20);
      updateSection4Content(last);
    }
  }, [articles]);

  return (
    <>
      <Seo
        title={seoTitle || ''}
        description={seoDescription || ''}
        keywords={seoKeywords || ''}
      />
    <div className="container-fluid topic-page-container">
      {showError && <ErrorPage />}
      {isPageLoading && !showError && (
        <div className="loader-div">
          <div className="loader" id="loader-1"></div>
        </div>
      )}
      {!isPageLoading && !showError && (
        <div>        
          <div
            className="separator"
            style={{ color: ROUTE_COLORS[`${title}`] }}
          >
            <h1>{"latest " + title + " headlines in Nigeria"}</h1>
          </div>

          {section1 && section1.length > 0 && (
            <div className="row">
              <div className="col-md-8">
                <div style={{ height: "300px" }}>
                  <NewsItemLarge newsItem={section1[0]} />
                </div>
              </div>
              {section1 && section1.length > 2 && (
                <div className="col-md-4">
                  <div style={{ height: "150px", paddingTop: "15px" }}>
                    <NewsItemSmall newsItem={section1[1]} />
                  </div>
                  <div style={{ height: "150px", paddingTop: "15px" }}>
                    <NewsItemSmall newsItem={section1[2]} />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="theme-seprator theme-padding"> </div>

          <div className="row">
            <div className="col-md-8">
              <div className="topic-articles-container">
                {section2?.length && section3?.length
                  ? [...section2, ...section3].map((newsItem) => (
                      <NewsItemCard key={newsItem.id} newsItem={newsItem} />
                    ))
                  : null}
              </div>
            </div>
            <div className="col-md-4">
              <div className="topic-articles-right-container">
                {section4?.length
                  ? [...section4].map((newsItem) => (
                      <NewsItemMediumWithText
                        key={newsItem.id}
                        newsItem={newsItem}
                      />
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Header;
