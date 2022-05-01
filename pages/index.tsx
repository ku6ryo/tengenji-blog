import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { client } from '../prismicio';
import { Client } from '@prismicio/client';
import Link from 'next/link';
import Image from "next/image"
import style from "./index.module.scss";

type Props = {
  query: Awaited<ReturnType<Client["getByType"]>>;
}

export const getServerSideProps: GetServerSideProps = async function(context) {
  const query = await client.getByType("blog")
  return { props: { query } };
}

const Home: NextPage<Props> = ({ query }) => {
  return (
    <>
      <Head>
        <title>Ten Tech</title>
      </Head>
      <div className={style.blog_title}>Ten Tech blog</div>
      <div className={style.list}>
        {query.results.map((doc) => {
          return (
            <Link href={`/blog/${doc.uid}`} key={doc.uid} passHref>
              <div className={style.item}>
                <Image className={style.image} src={doc.data.header_image.url} alt="thumbnail"/>
                <div className={style.title}>{doc.data.title}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default Home
