import Head from 'next/head'

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
              <a key={post.slug} href="#">
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>
                  {post.excerpt}
                </p>
              </a>
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
    slug: post.id,
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
