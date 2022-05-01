import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { client } from '../prismicio';
import { Client } from '@prismicio/client';
import Link from 'next/link';
import Image from "next/image"
import style from "./index.module.scss";
import dateformat from "dateformat";
import { TopBar } from '../components/TopBar';

type Props = {
  query: Awaited<ReturnType<Client["getByType"]>>;
}

export const getServerSideProps: GetServerSideProps = async function(context) {
  const query = await client.getByType("blog", {

  })
  return { props: { query } };
}

const Home: NextPage<Props> = ({ query }) => {
  return (
    <>
      <Head>
        <title>Tengenji Tech Blog</title>
        <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#" />
        <meta property="og:title" content="Tengenji Tech Blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tengenji.dev/" />
        <meta property="og:image" content={query.results[0].data.header_image.url} />
        <meta property="og:site_name" content="Tengenji Tech Blog" />
        <meta property="og:description" content="Blog posts about technologies" />
      </Head>
      <TopBar />
      <div className={style.list}>
        {query.results.map((doc) => {
          return (
            <Link href={`/blog/${doc.uid}`} key={doc.uid} passHref>
              <div className={style.item}>
                <div className={style.image}>
                  <Image
                    src={doc.data.header_image.url}
                    alt="thumbnail"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={style.text}>
                  <div className={style.title}>{doc.data.title}</div>
                  <div className={style.date}>{dateformat(doc.first_publication_date, "mmmm dS yyyy")}</div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default Home
