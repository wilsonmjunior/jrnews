import { asHTML } from "@prismicio/helpers";
import { getSession } from "next-auth/react";
import Head from "next/head";

import { createPrismicClient } from "../../services/prismic";
import { Session } from "../../types/next-auth.types";
import styles from './post.module.scss'

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>Home | Jr.news</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </>
  )
}

export async function getServerSideProps({ req, params }) {
  const session = await getSession({ req }) as Session;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const { slug } = params;

  const client = createPrismicClient(req);
  const response = await client.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: response.data.title,
    content: asHTML(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
  }

  return {
    props : {
      post,
    }
  }
}
