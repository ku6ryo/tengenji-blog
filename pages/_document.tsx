import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GoogleAnalytics } from '../components/GoogleAnalytics'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
          {process.env.GOOGLE_ANALYTICS_TAG_ID && (
            <GoogleAnalytics tagId={process.env.GOOGLE_ANALYTICS_TAG_ID}/>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument