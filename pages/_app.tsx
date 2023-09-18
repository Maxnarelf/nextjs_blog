import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../src/components/layout/Layout';
import '../src/pages/App/sass/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
