/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
import { Html, Head, Main, NextScript } from "next/document";
import Footer from "./components/Footer";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="author" content="Sortnio" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,  initial-scale=1.0"
        />
        <meta
          name="description"
          content="One stop for your groceries"
        />
        <meta name="keywords" content="nft, crypto, html5 template" />
        <title>Explore | Inshopper - Ecommerce Marketplace</title>
        <link rel="icon" sizes="16x16" href="../../favicon.ico" />
        <link
          rel="stylesheet"
          href="../../assets/css/vendor.css"
        />
        <link rel="stylesheet" href="../../assets/css/style.css" />
        <link rel="stylesheet" href="../../assets/css/intro.css" />
        <link rel="stylesheet" href="../../assets/css/main.css" />
      </Head>
      <body>
        <div className="page">
          <NextScript />
        </div>

        <script src="../../assets/js/bundle.js" defer></script>
<script src="../../assets/js/scripts.js" defer></script>

      </body>
    </Html>
  );
}
