import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GoogleAnalytics } from '../components/GoogleAnalytics'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {process.env.GOOGLE_ANALYTICS_TAG_ID && (
            <GoogleAnalytics tagId={process.env.GOOGLE_ANALYTICS_TAG_ID}/>
          )}
          <link rel="icon" type="image/png" href="/logo.png"/>
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