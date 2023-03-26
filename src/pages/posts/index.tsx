import Head from 'next/head'
import Link from 'next/link';

import { createPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss'

interface PostsProps {
  posts: {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
  }[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Jr.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {
            posts.map(post => (
              <Link key={post.slug} href={`posts/${post.slug}`}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>
                  {post.excerpt}
                </p>
              </Link>
            ))
          }
        </div>
      </main>
    </>
  )
}


export async function getStaticProps({ previewData }) {
  const client = createPrismicClient({ previewData });

  const response = await client.getAllByType('post');

  const posts = response.map((post) => ({
    slug: post.uid,
    title: post.data.title,
    excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
    updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
  }))

  return {
    props: {
      posts,
    },
  };
};
