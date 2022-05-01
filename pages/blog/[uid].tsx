import { Client } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import { client } from '../../prismicio';
import style from './[uid].module.scss';
import dateFormat from 'dateformat';
import { TopBar } from "../../components/TopBar";


type Props = {
  doc: Awaited<ReturnType<Client['getByUID']>>;
}

export const getServerSideProps: GetServerSideProps = async function(context) {
  const { uid } = context.query;
  if (!uid) {
    throw new Error('No uid provided');
  }
  if (Array.isArray(uid)) {
    throw new Error('Multiple uids provided');
  }
  const doc = await client.getByUID("blog", uid)
  return { props: { doc } };
}

const BlogPage: NextPage<Props> = ({ doc }) => {
  const { tags, data, uid, first_publication_date } = doc;
  const { title, header_image, content } = data
  return (
    <>
      <Head>
        <title>{title}</title>
        <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://tengenji.dev/blog/${uid}`} />
        <meta property="og:image" content={header_image.url} />
        <meta property="og:site_name" content="Tengenji Tech Blog" />
        <meta property="og:description" content="Blog posts about technologies" />
      </Head>
      <TopBar />
      <div className={style.header}>
        <div className={style.image} >
          <Image src={header_image.url}
            alt="header_image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className={style.container}>
        <div className={style.postedAt}>{dateFormat(first_publication_date, "mmmm dS yyyy")}</div>
        <div className={style.title}>{title}</div>
        {tags.length > 0 && (
          <div>
            {tags.map((tag) => (
              <div className={style.tag} key={tag}>{"#" + tag}</div>
            ))}
          </div>
        )}
        <article>
          <PrismicRichText field={content} />
        </article>
      </div>
    </>
  )
}

export default BlogPage
