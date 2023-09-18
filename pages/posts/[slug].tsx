import { Fragment } from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import IPosts from '@/interfaces/IPosts';
import { getPostData, getPostsFiles } from '../../lib/posts-util';
import PostContent from '../../src/pages/Posts/PostDetail/PostContent';

interface PostDetailPageProps {
  post: IPosts;
}
interface PostDetailPageProps {

}
function PostDetailPage({ post }:PostDetailPageProps) {
  return (
    <>
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content={post?.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
}

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (context) => {
  const { params } = context;
  const { slug } = params;

  const postData: IPosts = getPostData(slug as string);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postFileNames = getPostsFiles();

  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''));
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default PostDetailPage;
