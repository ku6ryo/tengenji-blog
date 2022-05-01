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
  const { tags } = doc;
  return (
    <>
      <Head>
        <title>{doc.data.title}</title>
        <meta title={doc.data.title} />
      </Head>
      <TopBar />
      <div className={style.header}>
        <div className={style.image} >
          <Image src={doc.data.header_image.url}
            alt="header_image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className={style.container}>
        <div className={style.postedAt}>{dateFormat(doc.first_publication_date, "mmmm dS yyyy")}</div>
        <div className={style.title}>{doc.data.title}</div>
        {tags.length > 0 && (
          <div>
            {tags.map((tag) => (
              <div className={style.tag} key={tag}>{"#" + tag}</div>
            ))}
          </div>
        )}
        <article>
          <PrismicRichText field={doc.data.content} />
        </article>
      </div>
    </>
  )
}

export default BlogPage
