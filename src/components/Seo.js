import PropTypes from "prop-types"
 import Head from "next/head";
 
 function Seo({ description, title, seoKeywords }) {
   
   return (
    <Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={seoKeywords}></meta>
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
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
        />
    </Head>
   )
 }
 export default Seo
 