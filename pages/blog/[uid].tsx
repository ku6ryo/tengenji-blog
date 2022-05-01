import { Client } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import { client } from '../../prismicio';
import style from './[uid].module.scss';



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
  return (
    <>
      <Head>
        <meta title={doc.data.title} />
      </Head>
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
        <div className={style.title}>{doc.data.title}</div>
        <article>
          <PrismicRichText field={doc.data.content} />
        </article>
      </div>
    </>
  )
}

export default BlogPage
