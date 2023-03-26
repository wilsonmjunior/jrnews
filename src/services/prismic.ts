import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';

const routes = [
  {
    type: 'post',
    path: '/',
  },
]



export const createPrismicClient = ({ ...config }) => {
  const client = prismic.createClient(process.env.PRISMIC_API_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    routes,
    ...config,
  })

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client;
}
