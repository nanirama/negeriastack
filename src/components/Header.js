import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { subscribeUser, isUserSubscribed } from "../actions/AuthAction";

const LogoIcon = "/assets/img/Logo.png";
const BusinessIcon = "/assets/icons/business.png";
const HomeIcon = "/assets/icons/home.png";
const MusicIcon = "/assets/icons/music.png";
const TechnologyIcon = "/assets/icons/technology.png";
const NewsIcon = "/assets/icons/news.png";
const SportsIcon = "/assets/icons/sports.png";
const TrendingIcon = "/assets/icons/trending.png";

const Header = (props) => {
  const [showError, setShowError] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [userSubscribedMessage, setUserSubscribedMessage] = useState("");

  useEffect(() => {
    async function updateUserSubscriptionBanner() {
      const showBanner = await isUserSubscribed();
      setShowBanner(!showBanner);
    }
    updateUserSubscriptionBanner();
  }, []);

  const router = useRouter();

  async function singupUser() {
    if (
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
        emailAddress
      )
    ) {
      const response = await subscribeUser(emailAddress);
      setUserSubscribed(true);
      setUserSubscribedMessage("Thank for signing up!");
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 500);
    }
  }

  function closeModal() {
    setShowBanner(false);
  }

  return (  
   <header id="page-topbar">
      {showBanner && (
        <div className="blue-banner">
          <p>
            {userSubscribed
              ? userSubscribedMessage
              : "Get the latest news and exclusive job openings by signing up!"}
          </p>
          {!userSubscribed && (
            <div className="form-group">
              <div className="email-wrapper">
                <input
                  type="email"
                  className={`rounder-input form-control ${
                    showError ? "error" : ""
                  }`}
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmailAddress(e.target.value)}
                ></input>
                <button
                  className="rounded-btn btn-black btn"
                  onClick={() => singupUser()}
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
          {userSubscribed && (
            <button
              className="rounded-btn btn-black btn"
              onClick={() => closeModal()}
            >
              close
            </button>
          )}
        </div>
      )}
      <nav
        className="navbar navbar-expand-lg navbar-dark custom-navigation"
        style={{ marginTop: showBanner ? 105 : 0 }}
      >
        <Link href="/">
          <a className="navbar-brand">
            <img src={LogoIcon} alt="Nigeriastack - Latest Nigerian News" />
          </a>
        </Link>
        <div className="nav-toggle-button dropdown">
          <div id="nav-icon1" className=" " data-toggle="dropdown">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="dropdown-menu">
            <div className="row">
              <div className="col">
                <Link href="/">
                  <a className="dropdown-item">Home</a>
                </Link>
                <Link href="/topic/trending">
                  <a className="dropdown-item">Trending</a>
                </Link>
                <Link href="/topic/news">
                  <a className="dropdown-item">News</a>
                </Link>
                <Link href="/topic/music">
                  <a className="dropdown-item">Music</a>
                </Link>
                <Link href="/topic/sports">
                  <a className="dropdown-item">Sports</a>
                </Link>
                <Link href="/topic/tech">
                  <a className="dropdown-item">Technology</a>
                </Link>
                <Link href="/topic/business">
                  <a className="dropdown-item">Business</a>
                </Link>
                <Link href="/topic/opinion">
                  <a className="dropdown-item">Editorial</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-sm bg-light primary-nav">
        <div
          className={`nav-item home ${
            router.pathname === "/" ? "active" : null
          }`}
        >
          <div className="topline"></div>
          <Link href="/">
            <a className="nav-link">
              <img src={HomeIcon} /> <span>Home</span>
            </a>
          </Link>
        </div>
        <div
          className={`nav-item trending ${
            router.pathname === "/topic/trending" ? "active" : null
          }`}
        >
          <div className="topline"></div>
          <Link href="/topic/trending">
            <a className="nav-link">
              <img src={TrendingIcon} />
              <span>Trending</span>
            </a>
          </Link>
        </div>
        <div
          className={`nav-item news ${
            router.pathname === "/topic/news" ? "active" : null
          }`}
        >
          <div className="topline"></div>
          <Link href="/topic/news">
            <a className="nav-link">
              <img src={NewsIcon} /> <span>News</span>
            </a>
          </Link>
        </div>
        <div
          className={`nav-item sports ${
            router.pathname === "/topic/sports" ? "active" : null
          }`}
        >
          <div className="topline"></div>
          <Link href="/topic/sports">
            <a className="nav-link">
              <img src={SportsIcon} />
              <span>Sports</span>
            </a>
          </Link>
        </div>
        <div
          className={`nav-item technology ${
            router.pathname === "/topic/technology" ? "active" : null
          }`}
        >
          <div className="topline"></div>
          <Link href="/topic/tech">
            <a className="nav-link">
              <img src={TechnologyIcon} />
              <span>Technology</span>
            </a>
          </Link>
        </div>
        <div
          className={`nav-item music ${
            router.pathname === "/topic/music" ? "active" : null
          }`}
        >
          <div className="topline"></div>
          <Link href="/topic/music">
            <a className="nav-link">
              <img src={MusicIcon} />
              <span>Music</span>
            </a>
          </Link>
        </div>
        <div
          className={`nav-item business ${
            router.pathname === "/topic/business" ? "active" : null
          }`}
        >
          <div className="topline"></div>
          <Link href="/topic/business">
            <a className="nav-link">
              <img src={BusinessIcon} />
              <span>Business</span>
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Header;
