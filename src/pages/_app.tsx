import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'

import { Header } from '../components/Header'
import '../styles/global.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider>
      <PrismicPreview repositoryName={process.env.PRISMIC_API_ENDPOINT}>
        <SessionProvider session={pageProps.session}>
          <Header />
          <Component {...pageProps} />
        </SessionProvider>
      </PrismicPreview>
    </PrismicProvider>
  )
}
