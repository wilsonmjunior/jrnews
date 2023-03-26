declare namespace NodeJS {
  interface ProcessEnv {
    PRISMIC_API_ENDPOINT: string;
    STRIPE_API_KEY: string;
    FAUNADB_KEY: string;
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    STRIPE_SUCCESS_URL: string;
    STRIPE_CANCEL_URL: string;
    STRIPE_WEBHOOK_SECRET: string;
    PRISMIC_ACCESS_TOKEN: string;
  }
}
