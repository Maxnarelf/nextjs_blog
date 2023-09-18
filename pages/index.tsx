import { Fragment } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getFeaturedPosts } from '../lib/posts-util';

import FeaturedPosts from '../src/pages/HomePages/FeaturedPosts';
import Hero from '../src/pages/HomePages/Hero';
import { IHomePage } from './interfaces/IHomePage';

function HomePage({ posts }: IHomePage) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export const getStaticProps: GetStaticProps<IHomePage> = async () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
};
export default HomePage;
