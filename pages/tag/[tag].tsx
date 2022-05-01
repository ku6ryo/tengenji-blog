import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { client } from '../../prismicio';
import { TopBar } from '../../components/TopBar';
import { ArticleList } from '../../components/ArticleList';
import { PrismicDocument } from "@prismicio/types"

type Props = {
  docs: PrismicDocument[]
}

export const getServerSideProps: GetServerSideProps = async function(context) {
  const { tag } = context.query 
  if (!tag) {
    throw new Error('No tag provided');
  }
  if (Array.isArray(tag)) {
    throw new Error('Multiple tags provided');
  }
  const query = await client.getByTag(tag)
  return { props: { docs: query.results } };
}

const Home: NextPage<Props> = ({ docs }) => {
  return (
    <>
      <Head>
        <title>Tengenji Tech Blog</title>
        <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#" />
        <meta property="og:title" content="Tengenji Tech Blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tengenji.dev/" />
        <meta property="og:image" content={docs[0].data.header_image.url} />
        <meta property="og:site_name" content="Tengenji Tech Blog" />
        <meta property="og:description" content="Blog posts about technologies" />
      </Head>
      <TopBar />
      <ArticleList docs={docs} />
    </>
  )
}

export default Home