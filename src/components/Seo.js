import PropTypes from "prop-types"
 import Head from "next/head";
 
 function Seo({ description, title, keywords }) {
   
   return (
    <Head>
    <meta charSet="utf-8" />
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description}/>}
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
  </Head>
   )
 }
 export default Seo
 