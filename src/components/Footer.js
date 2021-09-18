import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Logo = "/assets/img/Logo.png";
const EmailIcon = "/assets/social-icons/email.png";

import NewsItemSmall from "./newsItem/newsItemSmall";
import { subscribeUser, isUserSubscribed } from "../actions/AuthAction";
import { getHomeContent } from "../actions/HomeAction";
import { getArticleLink, getStrippedTitle } from "../utils/helper";

const DisclaimerModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="disclaimer-modal">
        <div className="terms-modal-header">
          <h1>
            Disclaimer for Nigeriastack
            <span onClick={onClose} className="close-modal">
              <i className="fa fa-times-circle"></i>
            </span>
          </h1>
        </div>
        <div className="terms-text">
          <p>
            If you require any more information or have any questions about our
            site's disclaimer, please feel free to contact us by email at
            info@nigeriastack.com
          </p>
          <p>
            <strong>Disclaimers for NigeriaStack</strong>
          </p>
          <p>
            All the information on this website is published in good faith and
            for general information purpose only. NigeriaStack does not make any
            warranties about the completeness, reliability and accuracy of this
            information. Any action you take upon the information you find on
            this website (www.nigeriastack.com), is strictly at your own risk.
            will not be liable for any losses and/or damages in connection with
            the use of our website.
          </p>
          <p>
            Some or all of the information from this site may have been culled
            or copied from another contributing websites. NigeriaStack does not
            take responsibility for the information displayed on its website as
            a result.
          </p>
          <p>
            From our website, you can visit other websites by following
            hyperlinks to such external sites. While we strive to provide only
            quality links to useful and ethical websites, we have no control
            over the content and nature of these sites. These links to other
            websites do not imply a recommendation for all the content found on
            these sites. Site owners and content may change without notice and
            may occur before we have the opportunity to remove a link which may
            have gone ‘bad'.
          </p>
          <p>
            Please be also aware that when you leave our website, other sites
            may have different privacy policies and terms which are beyond our
            control. Please be sure to check the Privacy Policies of these sites
            as well as their "Terms of Service" before engaging in any business
            or uploading any information.
          </p>
          <p>
            <strong>Consent</strong>
          </p>
          <p>
            <strong>
              By using our website, you hereby consent to our disclaimer and
              agree to its terms.
            </strong>
          </p>
          <p>
            <strong>Update</strong>
          </p>
          <p>
            Should we update, amend or make any changes to this document, those
            changes will be prominently posted here. Date – 7th May 2021
          </p>
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicyModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="terms-modal">
        <div className="terms-modal-header">
          <h1>
            Privacy Policy
            <span onClick={onClose} className="close-modal">
              <i className="fa fa-times-circle"></i>
            </span>
          </h1>
        </div>
        <div className="terms-text">
          <p>
            At www.nigeriastack.com, accessible from www.nigeristack.com, one of
            our main priorities is the privacy of our visitors. This Privacy
            Policy document contains types of information that is collected and
            recorded by www.nigeriastack.com and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us.
          </p>
          <p>
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in www.nigeriastack.com. This policy
            is not applicable to any information collected offline or via
            channels other than this website. Our Privacy Policy was created
            with the help of the Privacy Policy Generator and the Free Privacy
            Policy Generator.
          </p>
          <p>
            <strong>Consent</strong>
          </p>
          <p>
            <strong>
              By using our website, you hereby consent to our Privacy Policy and
              agree to its terms.
            </strong>
          </p>
          <p>
            <strong>Information we collect</strong>
          </p>
          <p>
            The personal information that you are asked to provide, and the
            reasons why you are asked to provide it, will be made clear to you
            at the point we ask you to provide your personal information. If you
            contact us directly, we may receive additional information about you
            such as your name, email address, phone number, the contents of the
            message and/or attachments you may send us, and any other
            information you may choose to provide.
          </p>
          <p>
            When you register for an Account, we may ask for your contact
            information, including items such as name, company name, address,
            email address, and telephone number.{" "}
          </p>
          <p>
            <strong>How we use your information</strong>
          </p>
          <p>
            We use the information we collect in various ways, including to: •
            Provide, operate, and maintain our webste • Improve, personalize,
            and expand our webste • Understand and analyze how you use our
            webste • Develop new products, services, features, and functionality
            • Communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates and other information relating to the webste, and for
            marketing and promotional purposes • Send you emails • Find and
            prevent fraud
          </p>

          <p>
            <strong>Log Files</strong>
          </p>
          <p>
            www.nigeriastack.com follows a standard procedure of using log
            files. These files log visitors when they visit websites. All
            hosting companies do this and a part of hosting services' analytics.
            The information collected by log files include internet protocol
            (IP) addresses, browser type, Internet Service Provider (ISP), date
            and time stamp, referring/exit pages, and possibly the number of
            clicks. These are not linked to any information that is personally
            identifiable. The purpose of the information is for analyzing
            trends, administering the site, tracking users' movement on the
            website, and gathering demographic information.
          </p>
          <p>
            <strong>Our Advertising Partners</strong>
          </p>
          <p>
            Some of advertisers on our site may use cookies and web beacons. Our
            advertising partners are listed below. Each of our advertising
            partners has their own Privacy Policy for their policies on user
            data. For easier access, we hyperlinked to their Privacy Policies
            below. • Google https://policies.google.com/technologies/ads{" "}
          </p>
          <p>
            <strong>Advertising Partners Privacy Policies </strong>
            <p>
              You may consult this list to find the Privacy Policy for each of
              the advertising partners of www.nigeriastack.com. Third-party ad
              servers or ad networks uses technologies like cookies, JavaScript,
              or Web Beacons that are used in their respective advertisements
              and links that appear on www.nigeriastack.com, which are sent
              directly to users' browser. They automatically receive your IP
              address when this occurs. These technologies are used to measure
              the effectiveness of their advertising campaigns and/or to
              personalize the advertising content that you see on websites that
              you visit. Note that www.nigeriastack.com has no access to or
              control over these cookies that are used by third-party
              advertisers.
            </p>
          </p>
          <p>
            <strong>Third Party Privacy Policies</strong>
          </p>
          <p>
            www.nigeriastack.com's Privacy Policy does not apply to other
            advertisers or websites. Thus, we are advising you to consult the
            respective Privacy Policies of these third-party ad servers for more
            detailed information. It may include their practices and
            instructions about how to opt-out of certain options.
          </p>
          <p>
            You can choose to disable cookies through your individual browser
            options. To know more detailed information about cookie management
            with specific web browsers, it can be found at the browsers'
            respective websites.
          </p>
          <p>
            <strong>
              CCPA Privacy Rights (Do Not Sell My Personal Information)
            </strong>
          </p>
          <p>
            Under the CCPA, among other rights, California consumers have the
            right to:
          </p>
          <p>
            Request that a business that collects a consumer's personal data
            disclose the categories and specific pieces of personal data that a
            business has collected about consumers.
          </p>
          <p>
            Request that a business delete any personal data about the consumer
            that a business has collected.
          </p>
          <p>
            Request that a business that sells a consumer's personal data, not
            sell the consumer's personal data.
          </p>
          <p>
            If you make a request, we have one month to respond to you. If you
            would like to exercise any of these rights, please contact us.
          </p>
          <p>
            <strong>GDPR Data Protection Rights</strong>
          </p>
          <p>
            We would like to make sure you are fully aware of all of your data
            protection rights. Every user is entitled to the following:
          </p>
          <p>
            The right to access – You have the right to request copies of your
            personal data. We may charge you a small fee for this service.
          </p>
          <p>
            The right to rectification – You have the right to request that we
            correct any information you believe is inaccurate. You also have the
            right to request that we complete the information you believe is
            incomplete.
          </p>
          <p>
            The right to erasure – You have the right to request that we erase
            your personal data, under certain conditions.
          </p>
          <p>
            The right to restrict processing – You have the right to request
            that we restrict the processing of your personal data, under certain
            conditions.
          </p>
          <p>
            The right to object to processing – You have the right to object to
            our processing of your personal data, under certain conditions.
          </p>
          <p>
            The right to data portability – You have the right to request that
            we transfer the data that we have collected to another organization,
            or directly to you, under certain conditions.
          </p>
          <p>
            If you make a request, we have one month to respond to you. If you
            would like to exercise any of these rights, please contact us.
          </p>
          <p>
            <strong>Children's Information</strong>
          </p>
          <p>
            Another part of our priority is adding protection for children while
            using the internet. We encourage parents and guardians to observe,
            participate in, and/or monitor and guide their online activity.
            www.nigeriastack.com does not knowingly collect any Personal
            Identifiable Information from children under the age of 13. If you
            think that your child provided this kind of information on our
            website, we strongly encourage you to contact us immediately and we
            will do our best efforts to promptly remove such information from
            our records.
          </p>
        </div>
      </div>
    </div>
  );
};

const Footer = (props) => {
  const [footerNewsItems, updatefooterNewsItems] = useState([]);
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [privacyPolicyModal, setPrivacyPolicyModal] = useState(false);
  const [disclaimerModal, setDisclaimerModal] = useState(false);

  const router = useRouter();

  React.useEffect(() => {
    async function updateUserSubscriptionBanner() {
      const userSubscribed = await isUserSubscribed();
      setUserSubscribed(userSubscribed);
    }
    updateUserSubscriptionBanner();
  }, []);

  React.useEffect(() => {
    async function fetchHomeContent() {
      const res = await getHomeContent();
      const data = res.data;
      if (data && data.length > 0) {
        let m4 = data.slice(7, 11);
        updatefooterNewsItems(m4);
      }
    }
    fetchHomeContent();
  }, []);

  async function singupUser() {
    if (
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
        emailAddress
      )
    ) {
      const response = await subscribeUser(emailAddress);
      setUserSubscribed(true);
    }
  }

  const footerLinks = (
    <ul className="footer-links">
      <li>
        <Link href="/topic/trending">Trending</Link>
      </li>
      <li>
        <Link href="/topic/news">News</Link>
      </li>
      <li>
        <Link href="/topic/sports">Sports</Link>
      </li>
      <li>
        <Link href="/topic/tech">Technology</Link>
      </li>
      <li>
        <Link href="/topic/music">Music</Link>
      </li>
      <li>
        <Link href="/topic/business">Business</Link>
      </li>
    </ul>
  );

  return (
    <>
      {disclaimerModal ? (
        <DisclaimerModal onClose={() => setDisclaimerModal(false)} />
      ) : null}
      {privacyPolicyModal ? (
        <PrivacyPolicyModal onClose={() => setPrivacyPolicyModal(false)} />
      ) : null}

      <div
        className="mt-5 footer"
        style={{ minHeight: "160px", width: "100%" }}
      >
        <div className="footer-pc">
          <div className="footer-col1">
            <Link href="/">
              <a className="logo-link">
                <img src={Logo} className="logo" alt="Nigera Stack" />
              </a>
            </Link>
            <p className="footer-description footer-text">
              The mission of Nigeriastack is to be the most accurate, most
              comprehensive, and most interesting source of news, sports,
              business, and entertainment in Nigeria. Nigeriastack operates to
              seek content that has high interest assertively, impacts the
              reader, provokes discussion, and advances the reader's knowledge.
            </p>

            {/* <div className="divider">STAY CONNECTED</div>

                    <p>Follow us on social media and be up to date with the latest happenings.</p>
                    <div className="socials my-5">
                        <a href="#"> <img src={FaceboookIcon} alt="Facebook" /> </a>
                        <a href="#"> <img src={TwitterIcon} alt="Twitter" /> </a>
                        <a href="#"> <img src={GooglePlusIcon} alt="Google Plus" /> </a>
                        <a href="#"> <img src={LinkedInIcon} alt="LinkedIn" /> </a>
                        <a href="#"> <img src={TelegramIcon} alt="Telegram" /> </a>
                    </div> */}

            <div className="divider">CONTACT US</div>
            <a href="mailto:info@nigeriastack.com" className="link">
              <img
                src={EmailIcon}
                style={{ height: "25px", marginRight: "10px" }}
              />
              Email: info@nigeriastack.com
            </a>
            <div className="divider" style={{ marginTop: "50px" }}>
              TERMS AND CONDITIONS
            </div>
            <ul className="footer-links">
              <li onClick={() => setPrivacyPolicyModal(true)}>
                <p>Privacy Policy</p>
              </li>
              <li onClick={() => setDisclaimerModal(true)}>
                <p>Disclaimer</p>
              </li>
            </ul>
          </div>

          <div className="footer-col2">
            <div className="divider">MORE NEWS</div>

            <div className="my-5">
              {footerNewsItems.length > 1
                ? footerNewsItems.slice(1).map((newsItem, index) => (
                    <div className="mt-3" key={index}>
                      <NewsItemSmall newsItem={newsItem} />
                    </div>
                  ))
                : [1, 2, 3].map((number) => (
                    <div className="mt-3" key={number}>
                      <NewsItemSmall placeholder />
                    </div>
                  ))}
            </div>

            {/* <div className="divider">NEWSLETTER</div>
                    <p className="footer-text">
                        Sign up to hear and get our daily new update via email.
                    </p>

                    <div className="footer-email mt-3">
                        { userSubscribed ? "You are subscribed to the newsletter." :
                            <>
                                <input type="text" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} placeholder="Enter Your Email address" />
                                <button onClick={singupUser}><img src={EmailIcon} /></button>
                            </>
                        }
                    </div> */}
          </div>
          <div className="footer-col3">
            <div className="divider">POST OF THE DAY</div>
            <div
              className="post-of-the-day"
              onClick={() =>
                router.push(
                  footerNewsItems.length && getArticleLink(footerNewsItems[0])
                )
              }
            >
              <img
                src={`${
                  footerNewsItems[0]?.image_backup || footerNewsItems[0]?.image
                }`}
                height="300px"
                alt={
                  footerNewsItems.length
                    ? getStrippedTitle(footerNewsItems[0])
                    : ""
                }
              />
            </div>

            <div className="divider">QUICK LINKS</div>
            {footerLinks}
          </div>
        </div>

        <div className="footer-mobile">
          <img
            src={Logo}
            width="300px"
            alt="Nigeriastack - Latest Nigerian News and Naija Breaking News Today"
          />
          <p className="my-4">
            The mission of Nigeriastack is to be the most accurate, most
            comprehensive, and most interesting source of news, sports,
            business, and entertainment in Nigeria. Nigeriastack operates to
            seek content that has high interest assertively, impacts the reader,
            provokes discussion, and advances the reader's knowledge.
          </p>
          <h1 className="my-3" style={{ fontSize: "24px" }}>
            QUICK LINKS
          </h1>
          <div className="ml-3">{footerLinks}</div>
          <h1 className="mt-5 mb-3" style={{ fontSize: "24px" }}>
            CONTACT US
          </h1>
          <div className="ml-3">
            <a
              className="link"
              style={{ fontSize: "18px" }}
              href="mailto:info@nigeriastack.com"
            >
              info@nigeriastack.com
            </a>
          </div>

          <h1 className="mt-5 mb-3" style={{ fontSize: "24px" }}>
            TERMS AND CONDITIONS
          </h1>
          <div className="ml-3">
            <ul className="footer-links">
              <li onClick={() => setPrivacyPolicyModal(true)}>
                <p>Privacy Policy</p>
              </li>
              <li onClick={() => setDisclaimerModal(true)}>
                <p>Disclaimer</p>
              </li>
            </ul>
          </div>

          {/* <div className="mt-5"><strong>Subscribe to our Newsletter</strong></div>

                <div className="footer-mobile-email mt-3">
                    { userSubscribed ? "You are subscribed to the newsletter." :
                        <>
                            <input type="text" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} placeholder="Type your email" />
                            <button onClick={singupUser}>send &#10140;</button>
                        </>
                    }
                </div> */}
        </div>
      </div>

      <div className="footer-copyright-pc">
        © COPYRIGHTS 2021 All Rights Reserved
      </div>

      <div className="footer-copyright-mobile">
        © COPYRIGHTS 2021 All Rights Rieserved
      </div>
    </>
  );
};
export default Footer;
