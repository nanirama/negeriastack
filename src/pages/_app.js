import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import * as GA from "../components/GA";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ErrorHandler from "../components/ErrorHandler";

// styles
import "../styles/shared/index.css";
import "../styles/header.scss";
import "../styles/footer.scss";
import "../styles/home.scss";
import "../styles/newsitem.scss";
import "../styles/topic.scss";
import "../styles/article.scss";
import "../styles/opinion.scss";
import "../styles/post.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.js");
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      GA.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* <Head>
        <title>
          Latest Nigerian News and Naija Breaking News Today – NigeriaStack
        </title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="canonical" href="https://nigeriastack.com/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="theme-color" content="#000000" />
        <meta property="og:site_name" content="Nigeria Stack" />
        <meta property="og:url" content="https://nigeriastack.com" />

        <meta
          property="og:title"
          content="Nigeria News | Breaking Naija News Today 24/7"
        />
        <meta
          property="og:description"
          content="Check out the latest Naija news and stay informed with Nigeriastack.com. Breaking news, Newspaper headlines, and current affairs coverage from across Nigeria. "
        />
        <meta
          property="og:image"
          content="https://nigeriastack.com/static/media/Logo.png"
        />
      </Head> */}
      <main>
        <Header />
        <ErrorHandler>
          <Component {...pageProps} />
        </ErrorHandler>
      </main>
      <Footer />
    </>
  );
}

export default MyApp;
