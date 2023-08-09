import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* The Font Awesome stylesheet */}
          <link href="https://fonts.googleapis.com/css?family=Poppins:200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&amp;display=swap" rel="stylesheet" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
          {/* Add Bootstrap and other stylesheets */}
          <link
          rel="stylesheet"
          href="../../assets/css/vendor.bundle.css"
        />
        <link rel="stylesheet" href="../../assets/css/style.css" />
        <link rel="stylesheet" href="../../assets/css/intro.css" />
        {/* <link rel="stylesheet" href="../../assets/css/main.css" /> */}
          <link rel="stylesheet" href="../../main.css" />

          {/* Font Awesome 4.7 CSS */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        </Head>
        <body style={{backgroundColor:"#f7f7f7 !important"}}>
          <Main />
          <NextScript />

          {/* Add custom JavaScript scripts */}
          <Script src="../../assets/js/bundle.js" />
        <Script src="../../assets/js/scripts.js" />
        
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
