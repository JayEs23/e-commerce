import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* The Font Awesome stylesheet */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Load the local jQuery script using next/script */}
          <Script src="/js/jquery-3.4.1.min.js" strategy="beforeInteractive" />
          {/* If you want to include Bootstrap, use next/script */}
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
            integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
            crossOrigin="anonymous"
          />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
