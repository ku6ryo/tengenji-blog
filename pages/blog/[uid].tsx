import { Client } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';
import { client } from '../../prismicio';
import style from './[uid].module.scss';



type Props = {
  page: Awaited<ReturnType<Client['getByUID']>>;
}

export const getServerSideProps: GetServerSideProps = async function(context) {
  const { uid } = context.query;
  if (!uid) {
    throw new Error('No uid provided');
  }
  if (Array.isArray(uid)) {
    throw new Error('Multiple uids provided');
  }
  const page = await client.getByUID("blog", uid)
  return { props: { page } };
}

const BlogPage: NextPage<Props> = ({ page }) => {
  console.log(page.data)
  return (
    <>
      <Head>
        <meta title={page.data.title} />
      </Head>
      <div className={style.container}>
        <div className={style.title}>{page.data.title}</div>
        <article>
          <PrismicRichText field={page.data.content} />
        </article>
      </div>
    </>
  )
}

export default BlogPage
