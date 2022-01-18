import { GetStaticProps } from 'next';
import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from '../styles/home.module.scss';

interface HomeProps {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home({ product: { amount, priceId } }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.container}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about <br />
            the <span>React</span> world
          </h1>
          <p>
            Get acess to all the publications<br />
            <span>for {amount} month</span>
          </p>

          <SubscribeButton priceId={priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl Codding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // const price = await stripe.prices.retrieve('price_1IepEXJLUcKzQSAp6OovUE8a', { expand: ['product'] })
  const price = await stripe.prices.retrieve('price_1IepEXJLUcKzQSAp6OovUE8a')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
