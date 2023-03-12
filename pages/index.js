import FeaturedPosts from "../components/home-pages/featured-posts";
import Hero from "../components/home-pages/hero";
import { Fragment } from "react";
import { getFeaturedPosts } from "../lib/posts-util";
import Head from "next/head";


function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps(){
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts
    }
  }
}
export default HomePage;