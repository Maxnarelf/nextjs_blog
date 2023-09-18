import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllPosts } from '../../lib/posts-util';
import AllPosts from '../../src/pages/Posts/AllPosts';
import { IHomePage } from '../interfaces/IHomePage';

// const DUMMY_POSTS = [
//     {
//       title: "Getting Started with NextJS",
//       image: 'getting-started-with-nextjs.png',
//       date: '2023-03-05',
//       slug: "getting-started-with-nextjs",
//       excerpt: 'NextJS is a the React framework for production',
//     },
//     {
//       title: "Getting Started with ReactJS",
//       image: 'getting-started-with-reactjs.png',
//       date: '2023-03-05',
//       slug: "getting-started-with-reactjs",
//       excerpt: 'NextJS is a the React framework for production',
//     },
//     {
//       title: "Getting Started with TypeScript",
//       image: 'getting-started-with-typescript.png',
//       date: '2023-03-05',
//       slug: "getting-started-with-typescript",
//       excerpt: 'NextJS is a the React framework for production',
//     },
//   ];

function AllPostsPage({ posts }: IHomePage) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
}

export const getStaticProps: GetStaticProps<IHomePage> = async () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
};
export default AllPostsPage;
